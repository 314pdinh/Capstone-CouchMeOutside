from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class JournalForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    country_name = StringField("Country Name", validators=[DataRequired()])
    # arrival_date = DateTimeField("Arrival Date", format='%Y-%m-%d')
    # departure_date = DateTimeField("Departure Date", format='%Y-%m-%d')
    food_review = IntegerField("Food Review", validators=[DataRequired()])
    sight_seeing_review = IntegerField("Sightseeing Review", validators=[DataRequired()])
    drinks_review = IntegerField("Drinks Review", validators=[DataRequired()])
    friendliness_review = IntegerField("Friendliness Review", validators=[DataRequired()])
    cleanliness_review = IntegerField("Cleanliness Review", validators=[DataRequired()])
    country_flag_image = FileField("Country Flag Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    journal_image = FileField("Journal Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    secondary_image = FileField("Secondary Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    third_image = FileField("Third Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    fourth_image = FileField("Fourth Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    note_description = StringField("Note Description", validators=[DataRequired()])
    memory_description = StringField("Memory Description", validators=[DataRequired()])
    submit = SubmitField("Submit")