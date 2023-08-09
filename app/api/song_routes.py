from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Song
from .auth_routes import validation_errors_to_error_messages
from pprint import pprint

# PREFIX '/api/songs'
songs_routes = Blueprint("songs", __name__)


# Home and Discover are okay here as we will make custom links in the frontend anyway
@songs_routes.route("/home")
def get_home():
    """
    This route takes you to the home page which returns all the songs
    """
    songs = Song.query.all()  # query.all returns an array
    all_songs = [song.to_dict() for song in songs]  # turns each song into a dictionary
    pprint(all_songs)
    return {
        "Songs": {song["id"]: song for song in all_songs}
    }  # this returns a dictionary of normalized data


# Maybe don't need this route because we have the home route
@songs_routes.route("/discover")
def get_discover():
    pass
    """
    This route takes you to the discover page kind of similar to the home page / Query/Filter by genre and "trending" somehow
    """


@songs_routes.route("/<int:songId>")
def get_song_id(songId):
    """
    This route takes you to a song's ID detail page.
    Returns a dictionary of the song's info and comments
    """
    song = Song.query.get(songId).to_dict()
    print(
        isinstance(songId, int)
    )  # True => <int:songId> turns it into an int within the url
    return song  # Returns song as a dictionary


# prefix /api/songs/new
@songs_routes.route("/new", methods=["POST"])
@login_required
def post_song():
    # pass
    """
    Once a user clicks the upload button, they are redirected to this route where they can post a new song.
    Returns a dictionary of the songs information, and AWS link
    """
    user_id = current_user.to_dict()["id"]
    print("this is the user id", user_id)
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        song = Song(
            title=form.data["title"],
            genre=form.data["genre"],
            song_url=form.data["song_url"],
            description=form.data["description"],
            private=form.data["private"],
            caption=form.data["caption"],
            preview_imageURL=form.data["preview_imageURL"],
            artistId=user_id,
        )
        db.session.add(song)
        db.session.commit()
        return song.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
