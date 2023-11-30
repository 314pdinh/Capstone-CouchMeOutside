from app.models import db, Activity, environment, SCHEMA
from datetime import datetime

def seed_activities():
    
    print("Seeding activities ...")

    activity1 = Activity (
        owner_id= 1,
        group_id= 1,
        activity_name= 'Hiking in the Mountains',
        activity_description= 'Enjoy a day of hiking in the beautiful mountains.',
        activity_image= 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg/1200px-Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
        )
    
    activity2 = Activity (
        owner_id= 2,
        group_id= 2,
        activity_name= 'Beach Picnic',
        activity_description= 'Relax on the beach and have a picnic with friends.',
        activity_image= 'https://lirp.cdn-website.com/a1c0ff55/dms3rep/multi/opt/beach+picnic-640w.JPG',
        )
    
    activity3 = Activity (
        owner_id= 3,
        group_id= 1,
        activity_name= 'Camping Trip',
        activity_description= 'Experience the great outdoors with a camping trip.',
        activity_image= 'https://media.cntraveler.com/photos/607313c3d1058698d13c31b5/1:1/w_1636,h_1636,c_limit/FamilyCamping-2021-GettyImages-948512452-2.jpg',
        )

    db.session.add(activity1)
    db.session.add(activity2)
    db.session.add(activity3)

    db.session.commit()
    
    print("Activity seeding completed....")
    
    return [activity1, activity2, activity3]

def undo_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM activities")
    
    db.session.commit()
