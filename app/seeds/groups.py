from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text

def seed_groups():
    
    print("Seeding groups...")
    
    group1 = Group (
        group_name= 'Graduation Celebration', 
        group_description= 'Celebrating our graduation from App Academy!',
        group_image= 'https://d194ip2226q57d.cloudfront.net/images/shutterstock_Graduation.original.jpg',
        owner_id= 1,
        )
        
    group2 = Group (
        group_name= 'Winter Getaway', 
        group_description= 'Exploring Japan during our winter break!', 
        group_image= 'https://media.gq-magazine.co.uk/photos/5d13a6cbeef9210ba4a001d2/16:9/w_2560%2Cc_limit/fitness-hp-gq-13dec18_getty_b.jpg',
        owner_id= 1 
        )
        
    group3 = Group (
        group_name= 'Dubai Trip', 
        group_description= 'Take a tour of Dubai greatest landmarks and food!', 
        group_image= 'https://www.skydivetecumseh.com/wp-content/uploads/2019/07/Beautiful-Sunset-1200x900.jpg',
        owner_id= 1
        )

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)

    db.session.commit()
    
    print("Group seeding completed.")
    return [group1, group2, group3]
    
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))
        
    db.session.commit()