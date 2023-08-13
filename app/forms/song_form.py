from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, InputRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class NewSongForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    genre = StringField("genre", validators=[DataRequired()])
    song = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_url = StringField("song_url", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    private = BooleanField(
        "private", validators=[InputRequired()]
    )  # Must use InputRequired() because sending "false" or false is a falsey value for DataRequired(), which will raise an error
    caption = StringField("profile_image")
    thumbnail = StringField("thumbnail")
