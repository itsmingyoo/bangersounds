from .db import (
    db,
    environment,
    SCHEMA,
    add_prefix_for_prod,
)  # this method is for foreign keys

from .likes import Like
from .reposts import Repost
from sqlalchemy.orm import joinedload # for eagerloading


class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # Required Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    # playlist_URL = db.Column(db.String(255), nullable=False)
    private = db.Column(
        db.Boolean, nullable=False
    )  # Default on frontend should be 'false' bc it's a radio button

    thumbnail = db.Column(db.String(255), nullable=True)
    tags = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    # Many-to-Many
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))
    )

    song_ids = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"))
    )

    playlist_songs = db.relationship("Song", back_populates="in_playlists")

    playlist_creator = db.relationship("User", back_populates="my_playlists")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "private" : self.private,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "songs": {song.id: song.to_dict() for song in self.playlist_songs},
            "user": self.playlist_creator.to_dict()
        }
