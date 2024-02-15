from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)
    
    user = db.relationship('User', back_populates='comments')
    group = db.relationship('Group', back_populates='comments')
        
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'timestamp': self.timestamp,
            'user_id': self.owner_id,
            'group_id': self.group_id
        }