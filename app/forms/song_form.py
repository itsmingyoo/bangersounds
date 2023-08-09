from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, InputRequired


class NewSongForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    genre = StringField("genre", validators=[DataRequired()])
    song_url = StringField("song_url", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    private = BooleanField(
        "private", validators=[InputRequired()]
    )  # Must use InputRequired() because sending "false" or false is a falsey value for DataRequired(), which will raise an error
    caption = StringField("profile_image")
    preview_imageURL = StringField("preview_imageURL")
