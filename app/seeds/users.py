from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    print("Seeding users...")
    
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        profile_picture='https://wallpapers.com/images/hd/instagram-profile-pictures-zjif3vdfrrxa00q6.jpg', 
        profile_img1='https://www.pigeonforgetncabins.com/wp-content/uploads/2022/03/skydiving-in-the-great-smoky-mountains-pigeon-forge.jpg', 
        profile_img2='https://hiddendepthsdiving.com/wp-content/uploads/2020/03/ScubaDiver.jpg', 
        bio="Love to travel and looking for buddies who share the same passion! If you're into exploring new places, trying local cuisines, and making unforgettable memories, let's connect.")
    peter = User(
        username='peter', 
        email='peter@aa.io', 
        password='password1', 
        profile_picture='https://www.traveloffpath.com/wp-content/uploads/2023/04/Man-at-Airport.jpg', 
        profile_img1='https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg', 
        profile_img2='https://c1.wallpaperflare.com/preview/889/908/843/parachute-training-military-jump-skydiving.jpg', 
        bio="Hey, I'm Peter, travel enthusiast eager to explore new places and meet awesome folks. Coffee chats, spontaneous adventures, or planning the next getaway—I'm up for it all. Let's turn simple moments into unforgettable experiences. Ready for the journey together?")
    josh = User(
        username='josh', 
        email='josh@aa.io', 
        password='password2', 
        profile_picture='https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png', 
        profile_img1='https://d1nymbkeomeoqg.cloudfront.net/photos/15/81/279616_31646_XL.jpg', 
        profile_img2='https://domf5oio6qrcr.cloudfront.net/medialibrary/12655/ce01a242-45ee-447e-b7e1-aa16a1580f40.jpg', 
        bio="Passionate about exploring the world and making connections along the way! If you share a love for travel and meeting interesting souls, let's create some memories together. Coffee, a stroll, or a spontaneous trip—let's make every moment an adventure!")
    emily = User(
        username='emily', 
        email='emily@aa.io', 
        password='password3', 
        profile_picture='https://img.freepik.com/free-photo/successful-female-entrepreneur-blue-collar-shirt_176420-28479.jpg', 
        profile_img1='https://cdn.britannica.com/21/233221-050-A0038475/torah-bright-Australia-snowboarder-2014.jpg', 
        profile_img2='https://media-cdn.tripadvisor.com/media/photo-s/12/0c/63/35/play-with-baby-elephants.jpg', 
        bio="Epic journeys and meaningful connections—two of my favorite things! If you're into exploring the world and meeting awesome individuals, let's make it happen. Coffee dates, impromptu meetups, or planning our next big adventure, the possibilities are endless!")
    grace = User(
        username='grace', 
        email='grace@aa.io', 
        password='password4', 
        profile_picture='https://www.careercontessa.com/uploadedImages/Advice/advice_1423-480w.jpg', 
        profile_img1='https://www.sail-world.com/photos/laserradial/yysw297728.jpg', 
        profile_img2='https://static.vecteezy.com/system/resources/thumbnails/004/486/902/small/young-hipster-woman-traveling-in-mountain-with-backpack-enjoying-sunrise-photo.jpg', 
        bio="Exploring the world and eager to connect with fellow travel enthusiasts. If you find joy in discovering new cultures and meeting interesting folks, let's make it happen! Coffee dates, group trips, or simply sharing travel tips—let's turn every moment into an adventure!")
    aiden = User(
        username='aiden', 
        email='aiden@aa.io', 
        password='password5', 
        profile_picture='https://img.freepik.com/premium-photo/portrait-handsome-smiling-stylish-hipster-lambersexual-modelmodern-man-dressed-blue-shirt-fashion-male-posing-street-background-near-skyscrapers-sunglasses_158538-21216.jpg',
        profile_img1='https://mountainhouse.com/cdn/shop/articles/person-snowshoeing-featured_1024x.jpg?v=1596054980', 
        profile_img2='https://cdn.getyourguide.com/img/tour/6398130132bdd.jpeg/148.jpg', 
        bio="Hey there! I'm Aiden, a travel enthusiast on a mission to explore the world and make meaningful connections. Whether it's swapping travel tips at a cozy cafe or planning our next escapade, I believe in turning every moment into an unforgettable adventure. Let's create memories together!")

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