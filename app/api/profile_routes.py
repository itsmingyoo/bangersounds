from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers_img import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages
from pprint import pprint

# PREFIX '/api/profile'
profile_routes = Blueprint("profile", __name__)

@profile_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def edit_profile(userId):
    user = User.query.get(userId)
    form = EditUserForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print('THIS IS USER TO DICT PREV INFO')
    pprint(user.to_dict())

    print('THIS IS THE FORM')
    print('form', form.data)
    if form.validate_on_submit():
        # PROFILE IMAGE AWS S3
        pfp_image = form.data['profile_image_aws']
        pfp_image.filename = get_unique_filename(pfp_image.filename)
        upload = upload_file_to_s3(pfp_image)
        if "url" not in upload:
            print('!!!!!!!!!!!!!!!')
            print('!!!!!!!!!!!!!!!')
            print('!!!!!!!!!!!!!!!')
            print('PFP PFP PFP URL NOT IN UPLOAD')
            return jsonify(upload), 400
        print('@@@@@@@@@@@@@@@')
        print('@@@@@@@@@@@@@@@')
        print('@@@@@@@@@@@@@@@')
        pfp_url = upload['url']
        print('this is pfp_url', pfp_url)

        # PROFILE BG AWS S3
        bg_image = form.data['profile_bg_image_aws']
        bg_image.filename = get_unique_filename(bg_image.filename)
        upload2 = upload_file_to_s3(bg_image)
        if "url" not in upload2:
            return jsonify(upload2), 400

        print('@@@@@@@@@@@@@@@')
        print('@@@@@@@@@@@@@@@')
        print('@@@@@@@@@@@@@@@')
        bg_url = upload2['url']
        print('this is bg_url', bg_url)


        user.display_name = form.data['display_name']
        # user.email = form.data['email']
        # user.password = form.data['password']
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.profile_image = pfp_url
        user.profile_bio = form.data['profile_bio']
        user.profile_city = form.data['profile_city']
        user.profile_country = form.data['profile_country']
        user.profile_background = bg_url

        db.session.commit()

        pprint(user.to_dict())

        return jsonify({'message': "Profile updated successfully", "user": user.to_dict()})
    print('???????????????')
    print('???????????????')
    print('???????????????')
    print('???????????????')
    print('???????????????')
    print('you never hit the if validate block')
    return {"errors": validation_errors_to_error_messages(form.errors), 'message': 'last return'}, 401



@profile_routes.route("/")
@login_required
def get_profile():
    pass
    """
    This route takes you to the user profile page.
    Returns a dictionary of user songs that they liked or reposted
    """


@profile_routes.route("/songs")
def get_profile_songs():
    pass
    """
    This route takes you to the user's songs page that they uploaded
    Returns a dictionary of songs they posted.
    """


@profile_routes.route("/songs/:songId")
def edit_song_id():
    pass
    """
    When a user is on the songs' ID page and clicks edit, it'll open up a form for the song with input boxes they want to edit for the song.
    Returns a dictionary of the song's id UPDATED INFORMATION to update in the frontend
    """


# Adjusting this into the /songs/:songId route
@profile_routes.route("/api/profile/songs/:songId")
def delete_song_id():
    pass
    """
    When a user is on the songs' ID page and clicks delete, it'll delete the song.
    Returns a dictionary of the song's id info to remove in the frontend state
    """
