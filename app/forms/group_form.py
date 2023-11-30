from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateTimeField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class GroupForm(FlaskForm):
    group_name = StringField('Group Name', validators=[DataRequired()])
    group_description = StringField("Group Description", validators=[DataRequired()])
    # group_image = FileField("Group Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")