from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import NewSongForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Song
from .auth_routes import validation_errors_to_error_messages
from pprint import pprint

# PREFIX '/api/songs'
songs_routes = Blueprint("songs", __name__)


# Home and Discover are okay here as we will make custom links in the frontend anyway
@songs_routes.route("/")
def get_songs():
    """
    This route returns all the songs
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
    songQuery = Song.query.get(songId)
    if not songQuery:
        return {"message": "Song couldn't be found."}
    song = songQuery.to_dict()
    print(
        isinstance(songId, int)
    )  # True => <int:songId> turns it into an int within the url
    return song  # Returns song as a dictionary


# prefix /api/songs/new
@songs_routes.route("/new", methods=["POST"])
@login_required
def post_song():
    """
    Once a user clicks the upload button, they are redirected to this route where they can post a new song.
    Returns a dictionary of the songs information, and AWS link
    """
    user_id = current_user.to_dict()["id"]
    print("this is the user id", user_id, isinstance(user_id, int))
    form = NewSongForm()
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
        return jsonify(song.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@songs_routes.route("/<int:songId>", methods=["PUT"])
@login_required
def edit_song(songId):
    """
    When a user is on their song details page and clicks the edit button (assuming the song belongs to them), they are able to edit the song
    Returns a dictionary of the songs UPDATED information, and AWS link
    """
    user_id = current_user.to_dict()["id"]
    print("this is the user id", user_id, isinstance(user_id, int))

    song = Song.query.get(songId)

    print("this is the song from the query", song)

    if not song:
        return {"message": "Song not found"}

    if user_id != song.artistId:
        return {"message": "You do not have the authority to edit this song."}

    form = NewSongForm()
    pprint(form.data)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        song.title = form.data["title"]
        song.genre = form.data["genre"]
        song.song_url = form.data["song_url"]
        song.description = form.data["description"]
        song.private = form.data["private"]
        song.caption = form.data["caption"]
        song.preview_imageURL = form.data["preview_imageURL"]
        song.artistId = user_id
        db.session.commit()
        return jsonify(song.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Delete will be on /profile/songs/:songId but altering it to /songs/:songId
@songs_routes.route("/<int:songId>", methods=['DELETE'])
def delete_song_id(songId):
    # pass
    """
    If a song belongs to a user, they are able to delete it.
    """
    user_id = current_user.to_dict()['id']
    song = Song.query.get(songId)

    # needs to be before the 'to_dict' method
    if not song:
        return {"message": "Song couldn't be found"}
    song_artist_id = song.to_dict()['artistInfo']['id']

    # print(song['artistInfo']['id']) # artist id for the song
    print('query result for song', song)
    print('userId:', user_id, '|','artistId', song_artist_id)

    if user_id != song_artist_id: #song doesnt belong to user, return error
        return jsonify({"errors": "You don't have permission to delete this song"}), 401
    else:
        db.session.delete(song)
        db.session.commit()
        # PYTHON STRING INTERPOLATION - ADD THE 'f'
        return jsonify({'message': f'Song with id: {songId} has been successfully deleted', 'song': song.to_dict()})
