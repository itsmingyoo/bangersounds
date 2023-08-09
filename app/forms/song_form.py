from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class NewSong(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    genre = StringField("genre", validators=[DataRequired()])
    song_url = StringField("song_url", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    private = BooleanField("private", validators=[DataRequired()])
    caption = StringField("profile_image")
    preview_imageURL = StringField("preview_imageURL")
