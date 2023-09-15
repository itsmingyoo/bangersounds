from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired
from app.models import User
from app.api.aws_helpers_img import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    # username = StringField('username')
    # email = StringField('email')
    # password = StringField('password')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    profile_image_aws = FileField('PFP_Image_File')
    profile_image = StringField('profile_image')
    profile_bio = StringField('profile_bio')
    profile_city = StringField('profile_city')
    profile_country = StringField('profile_country')
    display_name = StringField('display_name')
    profile_bg_image_aws = FileField('PF_BG_Image_File')
    profile_background = StringField('profile_background')
