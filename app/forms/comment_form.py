from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, InputRequired

class NewCommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
