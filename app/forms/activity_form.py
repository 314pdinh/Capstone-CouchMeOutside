from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class CreateActivityForm(FlaskForm):
    activity_name = StringField("Activity Name", validators=[DataRequired()])
    activity_description = StringField('Activity Description', validators=[DataRequired()])
    # activity_image = FileField('activity_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create Activity')
