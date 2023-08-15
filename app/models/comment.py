from .db import (
    db,
    environment,
    SCHEMA,
    add_prefix_for_prod,
)

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    #Columns
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')))
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    #Relationships - this is the one side, user and songs can have many comments
    comment_user = db.relationship("User", back_populates="user_comments")
    comment_song = db.relationship("Song", back_populates="song_comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "userId": self.userId,
            "songId": self.songId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
