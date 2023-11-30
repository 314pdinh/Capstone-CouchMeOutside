from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    print("Seeding users...")
    
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    peter = User(
        username='peter', email='peter@aa.io', password='password1', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    josh = User(
        username='josh', email='josh@aa.io', password='password2', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    emily = User(
        username='emily', email='emily@aa.io', password='password3', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    grace = User(
        username='grace', email='grace@aa.io', password='password4', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    aiden = User(
        username='aiden', email='aiden@aa.io', password='password5', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    db.session.add(demo)
    db.session.add(peter)
    db.session.add(josh)
    db.session.add(emily)
    db.session.add(grace)
    db.session.add(aiden)
    db.session.commit()

    print("User seeding completed.")
    return [demo, peter, josh, emily, grace, aiden ]

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()