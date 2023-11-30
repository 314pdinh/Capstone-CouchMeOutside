from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(255), nullable=False)
    group_description = db.Column(db.String(255), nullable=False)
    group_image = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False )
    
    activities = db.relationship('Activity', back_populates='group', cascade='all, delete-orphan')
    group_members = db.relationship('GroupMember', back_populates='group', cascade='all, delete-orphan')
    owner = db.relationship('User', back_populates='created_groups')
    
    def to_dict(self):
        members = [member.user.username for member in self.group_members]
        activities = [activity.to_dict() for activity in self.activities] 
        return {
            'id': self.id,
            'group_name': self.group_name,
            'group_description': self.group_description,
            'group_image': self.group_image,
            'owner_id': self.owner_id,
            'members': members,
            'activities': activities 
        }