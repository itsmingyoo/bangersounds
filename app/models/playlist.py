# from .db import (
#     db,
#     environment,
#     SCHEMA,
#     add_prefix_for_prod,
# )

# from .likes import Like
# from .reposts import Repost
# from sqlalchemy.orm import joinedload # for eagerloading
# from sqlalchemy.dialects.postgresql import JSON


# class Playlist(db.Model):
#     __tablename__ = "playlists"


#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}


    # Required Columns - KEEP THESE
    # id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(255), nullable=False)
    # genre = db.Column(db.String(255), nullable=False)
    # description = db.Column(db.String(255), nullable=False)
    # private = db.Column(db.Boolean, nullable=False)
    # thumbnail = db.Column(db.String(255), nullable=True)
    # tags = db.Column(db.String(255), nullable=True)
    # createdAt = db.Column(db.DateTime, default=db.func.now())
    # playlist_songs = db.Column(JSON) # this will be your songs object

    # One-to-Many - RELATIONSHIPS - KEEP THESE TWO
    # user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # playlist_creator = db.relationship("User", back_populates="my_playlists")


    # MANY TO MANY
    # song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"))) # don't need this anymore bc you're using a JSON object column 'playlist_songs' that stores all the song ids in json serialized format
    # playlist_songs = db.relationship("Song", back_populates="in_playlists")
    # songs = db.relationship('Song', secondary='playlist_songs', back_populates='playlists')
    # songs = db.relationship('Song', back_populates='playlists') # don't need this anymore bc you're using a JSON object column 'playlist_songs' that stores all the song ids in json serialized format

    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "title": self.title,
    #         "genre": self.genre,
    #         "description": self.description,
    #         "thumbnail": self.thumbnail,
    #         "private" : self.private,
    #         "createdAt": self.createdAt,
    #         "songs": self.playlist_songs,
    #     }

            # NOT NEEDED
            # "updatedAt": self.updatedAt,
            # "songs": {song.id: song.to_dict() for song in self.songs},

            # "songs": {playlist_song.song.id: {"added_at": playlist_song.added_at} for playlist_song in self.playlist_songs},
            # "user": self.playlist_creator.to_dict()
        # }

# class PlaylistSong(db.Model):
#     __tablename__ = 'playlist_songs'

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     # id = db.Column(db.Integer, primary_key=True)
#     playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True, nullable=False)
#     song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True, nullable=False)

#     playlist = db.relationship("Playlist", back_populates="playlist_songs")
#     song = db.relationship("Song", back_populates="in_playlists")
