from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

# PREFIX '/api/songs'
songs_routes = Blueprint("songs", __name__)


# Home and Discover are okay here as we will make custom links in the frontend anyway
@songs_routes.route("/home")
def get_home():
    pass
    """
    This route takes you to the home page which returns all the songs
    """


# Maybe don't need this route because we have the home route
@songs_routes.route("/discover")
def get_discover():
    pass
    """
    This route takes you to the discover page kind of similar to the home page
    """


@songs_routes.route("/<int:songId>")
def get_song_id():
    pass
    """
    This route takes you to a song's ID detail page.
    Returns a dictionary of the song's info and comments
    """


@songs_routes.route("/new")
def post_song():
    pass
    """
    Once a user clicks the upload button, they are redirected to this route where they can post a new song.
    Returns a dictionary of the songs information, and AWS link
    """
