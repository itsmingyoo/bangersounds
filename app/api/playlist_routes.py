from flask import Blueprint, jsonify, session, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Song, Comment, db, User, likes, reposts, Like, Repost, Playlist
import json
from pprint import pprint


playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route('')
def get_all_playlists():
    playlists = Playlist.query.all()
    return {playlist.to_dict()['id']: playlist.to_dict() for playlist in playlists}


# def get_all_playlists():
#     playlists = Playlist.query.all()

#     # Create a dictionary to store playlists and their songs
#     playlists_with_songs = {}

#     for playlist in playlists:
#         playlist_data = playlist.to_dict()
#         playlist_id = playlist_data['id']

#         # Get the songs associated with the playlist
#         songs = [song.to_dict() for song in playlist.songs]

#         # Store the playlist and its songs in the dictionary
#         playlists_with_songs[playlist_id] = {
#             **playlist_data,
#             'songs': songs
#         }

#     return playlists_with_songs


@playlist_routes.route('/<int:id>')
def get_playlist_by_id(id):
    playlist = Playlist.query.get(id)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)
    print('before to dict', playlist.playlist_songs)


    playlist = playlist.to_dict() # this parses it, you dont need the json.loads unless maybe you want it on the entire return 'playlist'
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    pprint(playlist)
    return playlist['songs']
    # return jsonify({"playlist": { json.loads(playlist.playlist_songs) } })
    # return jsonify({"playlist": playlist.playlist_songs})

@playlist_routes.route('/example')
def example_edit_songs():
    # Retrieving a playlist and parsing playlist_songs to a Python list
    playlist = Playlist.query.get(1)  # Replace 1 with the actual playlist ID
    playlist_songs_list = json.loads(playlist.playlist_songs)

    # Modifying the Python list of song IDs
    playlist_songs_list.append(5)
    playlist_songs_list.remove(3)

    # Converting the modified list back to JSON
    playlist.playlist_songs = json.dumps(playlist_songs_list)

    # Saving the updated playlist back to the database
    db.session.commit()
