from flask import Blueprint, jsonify, session, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import NewSongForm, NewCommentForm
from app.models import Song, Comment, db, User, likes, reposts, Like, Repost, Playlist
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import load_only
from sqlalchemy import JSON
from pprint import pprint


playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route('/<int:id>')
@login_required
def get_playlists(id):
    playlist = Playlist.query.get(id)
    return jsonify({"playlist": {playlist.title: playlist}})
