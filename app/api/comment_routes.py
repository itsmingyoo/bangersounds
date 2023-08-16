from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import NewCommentForm
from app.models import User, db
from app.models import Comment
from .auth_routes import validation_errors_to_error_messages
from pprint import pprint

# PREFIX '/api/comments'
comment_routes = Blueprint("comments", __name__)

@comment_routes.route('')
def get_comments():
    return { comment.to_dict()['id']: comment.to_dict() for comment in Comment.query.all() }

@comment_routes.route('/user-comments')
@login_required
def get_user_comments():
    user_id = current_user.to_dict()['id']
    return {comment.to_dict()['id']: comment.to_dict() for comment in Comment.query.filter_by(userId=user_id).all()}


# Post comment will make more sense in the songs route as /songs/songid/new

# delete should go here
