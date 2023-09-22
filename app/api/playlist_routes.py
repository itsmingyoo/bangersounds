# from flask import Blueprint, jsonify, session, request, abort
# from flask_login import current_user, login_user, logout_user, login_required
# from app.models import Song, Comment, db, User, likes, reposts, Like, Repost, Playlist
# import json
# from pprint import pprint


# playlist_routes = Blueprint("playlists", __name__)

# @playlist_routes.route('/<int:id>')
# @login_required
# def get_playlists(id):
#     playlist = Playlist.query.get(id)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)
#     print('before to dict', playlist.playlist_songs)


#     playlist = playlist.to_dict() # this parses it, you dont need the json.loads unless maybe you want it on the entire return 'playlist'
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     pprint(playlist)
#     return playlist['songs']
#     # return jsonify({"playlist": { json.loads(playlist.playlist_songs) } })
#     # return jsonify({"playlist": playlist.playlist_songs})
