from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import NewCommentForm
from app.models import User, db
from app.models import Comment
from .auth_routes import validation_errors_to_error_messages
from pprint import pprint

# PREFIX '/api/comments'
comment_routes = Blueprint("comments", __name__)
