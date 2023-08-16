from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import NewSongForm, NewCommentForm
from app.models import Song, Comment, db, User
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
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

        song = form.data["song"]
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)
        # print('this is upload this is upload this is upload this is upload ', upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print('@@@ WE ARE IN THE IF URL NOT IN UPLOAD BLOCK @@@')
            print(jsonify(upload))
            return jsonify(upload), 400

        url = upload["url"]
        song = Song(
            title=form.data["title"],
            genre=form.data["genre"],
            song_url=url,
            description=form.data["description"],
            private=form.data["private"],
            caption=form.data["caption"],
            thumbnail=form.data["thumbnail"],
            artistId=user_id,
        )
        db.session.add(song)
        db.session.commit()

        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        pprint(song.to_dict())
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')
        print('this is the song!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@')

        return jsonify(song.to_dict())
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    print('@@@ WE ARE AT THE END OF THE CODE WITH ERRORS @@@')
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# upload song route - validate the first part when they submit a song - then it will lead to the top route for phase 2 and validate the other data
# this will return a url to you, you can pass it into your NewSongForm through saved state
# in post man you use form-data option with key of 'song' and you can select a media file

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
        return {"message": "Song couldn't be found"}, 404
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
        return jsonify({'message': f'Song with id: {songId} has been successfully deleted', 'song': song.to_dict()}), 200



################# COMMENTS ROUTES FOR SONGS #################################
################# COMMENTS ROUTES FOR SONGS #################################
################# COMMENTS ROUTES FOR SONGS #################################
################# COMMENTS ROUTES FOR SONGS #################################
################# COMMENTS ROUTES FOR SONGS #################################
################# COMMENTS ROUTES FOR SONGS #################################

@songs_routes.route('/<int:songId>/comments')
def get_song_comments(songId):
    return jsonify({comment.to_dict()['id']: comment.to_dict() for comment in Comment.query.filter_by(songId=songId).all()})


@songs_routes.route('/<int:songId>/comment', methods=['POST'])
@login_required
def post_comment(songId):
    user_id = current_user.to_dict()['id']
    # song = Song.query.get(songId)
    form = NewCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_comment = Comment(
            userId=user_id,
            songId=songId,
            comment=form.data['comment'],
        )
        db.session.add(new_comment)
        db.session.commit()
        print('LOOK BELOW')
        pprint(new_comment.to_dict())
        print('LOOK ABOVE')
        return jsonify(new_comment.to_dict()), 201
    return {"error": "Error making a comment"}, 401

@songs_routes.route('/<int:songId>/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(songId, commentId):
    user_id = current_user.to_dict()['id']
    comment = Comment.query.get(commentId)
    if not comment:
        return {"error": "Comment couldn't be found."}

    if user_id == comment.userId:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"deletedComment": comment.to_dict()}), 200
    return {"error": "Unable to delete this comment."}, 401






# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# AWS Test Route
# @songs_routes.route("/test", methods=["POST"])
# @login_required
# def upload_image():
#     form = SongUploadForm()

#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():

#         song = form.data["song"]
#         song.filename = get_unique_filename(song.filename)
#         upload = upload_file_to_s3(song)
#         print('this is upload this is upload this is upload this is upload ', upload)

#         if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when you tried to upload
#         # so you send back that error message (and you printed it above)
#             return jsonify(upload), 400

#         url = upload["url"]
#         new_song = NewSong(song=url)
#         db.session.add(new_song)
#         db.session.commit()
#         print(new_song.to_dict())
#         nstd = new_song.to_dict()
#         return jsonify(nstd)
#         return {"message": 'this is working'}, 200

#     if form.errors:
#         print(form.errors)
#         return form.errors
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
