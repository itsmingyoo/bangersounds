from .db import (
    db,
    environment,
    SCHEMA,
    add_prefix_for_prod,
)  # this method is for foreign keys

from .likes import Like
from .reposts import Repost
from sqlalchemy.orm import joinedload # for eagerloading


class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # Required Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    song_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    private = db.Column(
        db.Boolean, nullable=False
    )  # Default on frontend should be 'false'

    # Not Required / Nullable Columns
    caption = db.Column(db.String(255), nullable=True)  # Nullable
    thumbnail = db.Column(db.String(255), nullable=True)

    # Song-User Relationship FK Column
    artistId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # # One to Many - Many side
    user_songs = db.relationship("User", back_populates="song_users")

    # Relationship to Comments
    song_comments = db.relationship("Comment", back_populates="comment_song")

    # Relationship to Users who Liked the Song
    liked_by_users = db.relationship("Like", back_populates="song")

    # Relationship to Users who Reposted the Song
    reposted_by_users = db.relationship("Repost", back_populates="song")


    # Reference if you want to use createdAt/updatedAt times
    # Your comments require a time from the song and displays 'time since created' i.e. '15 minutes ago'
    # createdAt = db.Column(db.DateTime, default=db.func.now())
    # updatedAt = db.Column(db.DateTime, default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "songURL": self.song_url,
            "description": self.description,
            "private": self.private,
            "artistId": self.artistId,
            # Nullable
            "caption": self.caption,
            "thumbnail": self.thumbnail,

            # LAZY LOADING - THIS RUNS MULTIPLE QUERIES RESULTING IN N+1
            "artistInfo": self.user_songs.to_dict(),
            "comments": [comment.to_dict() for comment in self.song_comments],
            "likes": {like.to_dict()['id']: like.to_dict() for like in self.liked_by_users},
            "reposts": {repost.to_dict()['id']: repost.to_dict() for repost in self.reposted_by_users}
            # "createdAt": self.createdAt,
            # "updatedAt": self.updatedAt,
        }

    # EAGER LOADING - THIS WOULD REDUCE THE AMOUNT OF QUERIES TO IMPROVE YOUR SITE PERFORMANCE - ALSO GOOD TO USE ALONG WITH THE LAZY LOADING ABOVE - CHECK GET ALL SONGS ROUTE FOR AN EXAMPLE OF HOW TO RUN ONE QUERY WITH 'JOINEDLOAD' EAGERLOADING
    @classmethod
    def get_song_with_related_data(cls, song_id):
        return cls.query.options(
            joinedload(cls.user_songs),
            joinedload(cls.song_comments),
            joinedload(cls.liked_by_users),
            joinedload(cls.reposted_by_users)
        ).get(song_id)
