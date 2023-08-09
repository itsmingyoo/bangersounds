from .db import (
    db,
    environment,
    SCHEMA,
    add_prefix_for_prod,
)  # this method is for foreign keys

# from .user import User


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
    preview_imageURL = db.Column(db.String(255), nullable=True)

    # Song-User Relationship FK Column
    artistId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # # One to Many - Many side
    user_songs = db.relationship("User", back_populates="song_users")

    # Nate's code
    # user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Reference if you want to use createdAt/updatedAt times
    # Your comments require a time from the song and displays 'time since created' i.e. '15 minutes ago'
    # createdAt = db.Column(db.DateTime, default=db.func.now())
    # updatedAt = db.Column(db.DateTime, default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "song_url": self.song_url,
            "description": self.description,
            "private": self.private,
            # "artistId": self.artistId,
            # Nullable
            "caption": self.caption,
            "preview_imageURL": self.preview_imageURL,
            # "createdAt": self.createdAt,
            # "updatedAt": self.updatedAt,
        }
