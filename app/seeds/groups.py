from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text

def seed_groups():
    
    print("Seeding groups...")
    
    group1 = Group (
        group_name= 'Graduation', 
        group_description= 'Celebrating our graduation',
        group_image= 'https://www.southernliving.com/thmb/osQ0-qCdyJmTELa8n7OnCE1cwz4:/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/graduates-throwing-caps-1066324992-2000-c66181da679b46dab1f62f4b2fbe3e84.jpg',
        owner_id= 1,
        )
        
    group2 = Group (
        group_name= 'Winter getawat', 
        group_description= 'Snowboarding down Mt Everest', 
        group_image= 'https://media.gq-magazine.co.uk/photos/5d13a6cbeef9210ba4a001d2/16:9/w_2560%2Cc_limit/fitness-hp-gq-13dec18_getty_b.jpg',
        owner_id= 1 
        )
        
    group3 = Group (
        group_name= 'Dubai trip', 
        group_description= 'Sky dive at Dubai, get the perfect view', 
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