from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import User

class EditUserForm(FlaskForm):
    # username = StringField('username')
    email = StringField('email')
    password = StringField('password')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    profile_image = StringField('profile_image')
    profile_bio = StringField('profile_bio')
    profile_city = StringField('profile_city')
    profile_country = StringField('profile_country')
    display_name = StringField('display_name')
    profile_background = StringField('profile_background')
