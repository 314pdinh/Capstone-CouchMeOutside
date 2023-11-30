from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    print("Seeding users...")
    
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Love to travel and looking for buddies who share the same passion! If you're into exploring new places, trying local cuisines, and making unforgettable memories, let's connect.")
    peter = User(
        username='peter', email='peter@aa.io', password='password1', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Hey, I'm Peter, travel enthusiast eager to explore new places and meet awesome folks. Coffee chats, spontaneous adventures, or planning the next getaway—I'm up for it all. Let's turn simple moments into unforgettable experiences. Ready for the journey together?")
    josh = User(
        username='josh', email='josh@aa.io', password='password2', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Passionate about exploring the world and making connections along the way! If you share a love for travel and meeting interesting souls, let's create some memories together. Coffee, a stroll, or a spontaneous trip—let's make every moment an adventure!")
    emily = User(
        username='emily', email='emily@aa.io', password='password3', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Epic journeys and meaningful connections—two of my favorite things! If you're into exploring the world and meeting awesome individuals, let's make it happen. Coffee dates, impromptu meetups, or planning our next big adventure, the possibilities are endless!")
    grace = User(
        username='grace', email='grace@aa.io', password='password4', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Exploring the world and eager to connect with fellow travel enthusiasts. If you find joy in discovering new cultures and meeting interesting folks, let's make it happen! Coffee dates, group trips, or simply sharing travel tips—let's turn every moment into an adventure!")
    aiden = User(
        username='aiden', email='aiden@aa.io', password='password5', profile_picture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', bio="Hey there! I'm Aiden, a travel enthusiast on a mission to explore the world and make meaningful connections. Whether it's swapping travel tips at a cozy cafe or planning our next escapade, I believe in turning every moment into an unforgettable adventure. Let's create memories together!")

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