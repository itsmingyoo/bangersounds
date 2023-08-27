from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import EditUserForm
from flask_login import current_user, login_user, logout_user, login_required

# PREFIX '/api/profile'
profile_routes = Blueprint("profile", __name__)

@profile_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def edit_profile(userId):
    user = User.query.get(userId)
    form = EditUserForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user.display_name = form.data['display_name']
        user.email = form.data['email']
        user.password = form.data['password']
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.profile_image = form.data['profile_image']
        user.profile_bio = form.data['profile_bio']
        user.profile_city = form.data['profile_city']
        user.profile_country = form.data['profile_country']

        db.session.commit()

        return jsonify({'message': "Profile updated successfully", "user": user.to_dict()})

    return jsonify(errors=form.errors), 400



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
