from app.models import db, Playlist, User, Song, PlaylistSong
from datetime import datetime, timedelta
import random

def seed_playlists():
    # Query all users/songs
    users = User.query.all()
    songs = Song.query.all()

    # create one playlist per user
    for user in users:
        playlist = Playlist(
            title=f"{user.username}'s Playlist",
            genre="Genre",
            description="Description",
            thumbnail="Thumbnail URL",
            private=False,  # Set privacy as needed
            user_id=user.id,
        )

        # add 3-5 songs to user playlist
        num_songs_in_playlist = random.randint(3, 5)

        # Shuffle the songs to select a random subset
        shuffled_songs = random.sample(songs, num_songs_in_playlist)

        # Keep track of added song IDs
        added_song_ids = set()

        for song in shuffled_songs:
            if song.id not in added_song_ids:
                playlist_song = PlaylistSong(
                    playlist=playlist,
                    song=song,
                    added_at=datetime.now(),
                )

                db.session.add(playlist_song)
                added_song_ids.add(song.id)  # Add song ID to the set to prevent duplicates

        db.session.add(playlist)

    # Commit the changes to the database
    db.session.commit()

def undo_playlists():
    # Assuming you have a way to query and delete playlists
    playlists_to_delete = Playlist.query.all()

    for playlist in playlists_to_delete:
        db.session.delete(playlist)

    # Commit the changes to the database
    db.session.commit()
