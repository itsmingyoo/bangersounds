from flask import jsonify
from app.models import db, Playlist, User, Song
from datetime import datetime, timedelta
from pprint import pprint
import random
import json

def seed_playlists():
    playlist = Playlist(
        title="My Sample Playlist",
        genre="Pop",
        description="A great collection of pop songs",
        private=True,
        thumbnail="thumbnail_url",
        tags="pop, music",
        user_id=1,
        playlist_songs={}

    )
    # Add songs to the playlist
    playlist.playlist_songs = json.dumps({1: 1, 2: 2, 3: 3})
    # song_ids = [1, 2, 3]

    # Append the songs to the playlist's songs attribute
    # for song_id in song_ids:
    #     song = Song.query.get(song_id)
    #     playlist.song_id = song.id
    #     # playlist.playlist_songs[song_id] = json.dumps({"songId": song.id})
    #     playlist.playlist_songs[song_id] = json.dumps({"songId": song.id})


    # Commit the playlist and songs to the database
    db.session.add(playlist)
    db.session.commit()


    # OLD OLD OLD!!!!@!@!!
    # # Query all users/songs
    # users = User.query.all()
    # songs = Song.query.all()

    # # create one playlist per user
    # for user in users:
    #     playlist = Playlist(
    #         title=f"{user.username}'s Playlist",
    #         genre="Genre",
    #         description="Description",
    #         thumbnail="Thumbnail URL",
    #         private=False,  # Set privacy as needed
    #         user_id=user.id,
    #     )

    #     # add 3-5 songs to user playlist
    #     num_songs_in_playlist = random.randint(3, 5)

    #     # Shuffle the songs to select a random subset
    #     shuffled_songs = random.sample(songs, num_songs_in_playlist)

    #     # Keep track of added song IDs
    #     added_song_ids = set()

    #     for song in shuffled_songs:
    #         if song.id not in added_song_ids:
    #             playlist_song = PlaylistSong(
    #                 playlist=playlist,
    #                 song_id=song.id,
    #                 added_at=datetime.now(),
    #             )

    #             db.session.add(playlist_song)
    #             added_song_ids.add(song.id)  # Add song ID to the set to prevent duplicates

    #     db.session.add(playlist)

    # # Commit the changes to the database
    # db.session.commit()

def undo_playlists():
    # Assuming you have a way to query and delete playlists
    playlists_to_delete = Playlist.query.all()

    for playlist in playlists_to_delete:
        db.session.delete(playlist)

    # Commit the changes to the database
    db.session.commit()
