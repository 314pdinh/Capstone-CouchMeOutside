from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

class AddMembersForm(FlaskForm):
    username=StringField('Username')
    submit = SubmitField('Create Activity')