from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Journal(db.Model):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    country_name = db.Column(db.String(255), nullable=False)
    note_description = db.Column(db.String(255), nullable=False)
    memory_description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # arrival_date = db.Column(db.DateTime)
    # departure_date = db.Column(db.DateTime)
    country_flag_image = db.Column(db.String(255))
    journal_image = db.Column(db.String(255))
    secondary_image = db.Column(db.String(255))  
    third_image = db.Column(db.String(255))
    fourth_image = db.Column(db.String(255))
    food_review = db.Column(db.Float)
    sight_seeing_review = db.Column(db.Float)
    drinks_review = db.Column(db.Float)
    friendliness_review = db.Column(db.Float)
    cleanliness_review = db.Column(db.Float)  
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='journals')
    # reviews = db.relationship('Review', back_populates='journal', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Journal id:{self.id} name:{self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'countryName': self.country_name,
            'noteDescription': self.note_description,
            'memoryDescription': self.memory_description,
            'countryFlagImage': self.country_flag_image,
            'journalImage': self.journal_image,
            'secondaryImage': self.secondary_image,
            'thirdImage': self.third_image,
            'fourthImage': self.fourth_image,
            # 'arrivalDate': self.arrival_date,
            # 'departureDate': self.departure_date,
            'foodReview': self.food_review,
            'sightSeeingReview': self.sight_seeing_review,
            'drinksReview': self.drinks_review,
            'friendlinessReview': self.friendliness_review,
            'cleanlinessReview': self.cleanliness_review,
            'ownerId': self.owner_id
        }