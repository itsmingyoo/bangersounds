from app.models import db, Playlist, User
from datetime import datetime, timedelta
import random

def seed_playlists():
    playlists_data = []  # Initialize an empty list to collect seed data
    users = User.query.all()  # Assuming you have loaded user data using SQLAlchemy

    for user in users:
        num_songs = random.randint(4, 8)  # Random number of songs per playlist
        current_date = datetime.now()
        random_days_ago = random.randint(1, 365)
        added_date = current_date - timedelta(days=random_days_ago)
        user_playlist_data = {
            "title": f"{user.username}'s Playlist",
            "genre": "Genre",
            "description": "Description",
            "thumbnail": "Thumbnail URL",
            "private": False,  # Set privacy as needed
            "user_id": user.id,
            "createdAt": added_date, #.strftime("%Y-%m-%d %H:%M:%S"),
            "updatedAt": added_date #.strftime("%Y-%m-%d %H:%M:%S"),
        }

        # Initialize a set to track added song IDs for this user's playlist
        added_song_ids = set()

        # Generate unique song IDs for the playlist
        song_ids = []
        while len(song_ids) < num_songs:
            song_id = random.randint(1, 80)  # Assuming song IDs are 1 to 80
            # Check if the song is not already added to this playlist
            if song_id not in added_song_ids:
                song_ids.append(song_id)
                added_song_ids.add(song_id)
        user_playlist_data["song_ids"] = song_ids

        # Create the Playlist instance and add it to the database session
        playlist = Playlist(**user_playlist_data)
        # Append the data to the playlists_data list
        db.session.add(playlist)


    # Commit the changes to the database
    db.session.commit()

    return playlists_data

def undo_playlists():
    # Assuming you have a way to query and delete playlists
    playlists_to_delete = Playlist.query.all()

    for playlist in playlists_to_delete:
        db.session.delete(playlist)

    # Commit the changes to the database
    db.session.commit()

def undo_playlists():
    # Assuming you have a way to query and delete playlists
    playlists_to_delete = Playlist.query.all()

    for playlist in playlists_to_delete:
        db.session.delete(playlist)

    # Commit the changes to the database
    db.session.commit()
