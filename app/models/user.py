from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(250), nullable=False)
    profile_img1 = db.Column(db.String(250), nullable=False)
    profile_img2 = db.Column(db.String(250), nullable=False)

    bio = db.Column(db.String(400), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    groups = db.relationship('GroupMember', back_populates='user', cascade='all, delete-orphan')
    activities = db.relationship('Activity', back_populates='owner', cascade="delete-orphan, all")
    journals = db.relationship('Journal', back_populates='user',  cascade="delete-orphan, all")
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    
    created_groups = db.relationship('Group', back_populates='owner')
  

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePic': self.profile_picture,
            'profile_img1': self.profile_img1,
            'profile_img2': self.profile_img2,
            'bio':self.bio
        }