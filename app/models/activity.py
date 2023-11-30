from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Activity(db.Model):
    __tablename__ = 'activities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)

    activity_name = db.Column(db.String(255), nullable=False)
    activity_description = db.Column(db.String(255), nullable=False)
    activity_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now())
    
    
    owner = db.relationship('User', back_populates='activities')
    group = db.relationship('Group', back_populates='activities')

    def to_dict(self):
        
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            "owner_name": self.owner.username,
            'group_id': self.group_id,
            'activity_name': self.activity_name,
            'activity_description': self.activity_description,
            'activity_image': self.activity_image,
            'created_at': self.created_at,
        }