from app.models import db, Journal, environment, SCHEMA
from sqlalchemy.sql import text


def seed_journals():
    
    print("Seeding journals...")

    
    for journal in [
       {
            "name": 'Trip to Paris',
            "country_name": 'France',
            "country_flag_image": 'https://cdn.pixabay.com/photo/2012/04/11/15/19/france-28463_640.png',
            "note_description": 'Exploring the beautiful city of Paris.',
            "memory_description": 'Unforgettable memories at the Eiffel Tower. Met the love of my life!',
            "owner_id": 2,
            "journal_image": "https://t4.ftcdn.net/jpg/02/96/15/35/360_F_296153501_B34baBHDkFXbl5RmzxpiOumF4LHGCvAE.jpg",
            "secondary_image": "https://images.unsplash.com/photo-1568322445389-e9093c2695c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyaXMlMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            "third_image": "https://c8.alamy.com/comp/EJHRB9/cafe-de-flore-exterior-paris-france-EJHRB9.jpg",
            "fourth_image": "https://i0.wp.com/thegoodlifefrance.com/wp-content/uploads/2019/11/paris-in-winter.jpg",
            "arrival_date": "2023-08-15",
            "depature_date": "2023-08-22",
            "food_review": 5,
            "sight_seeing_review": 5,
            "drinks_review": 5,
            "friendliness_review": 5,
            "cleanliness_review": 5,
        },
        {
            "name": "Adventures in Tokyo",
            "country_name": "Japan",
            "country_flag_image": "https://images2.pics4learning.com/catalog/j/japanfl.jpg",
            "note_description": "Discovering the unique culture of Tokyo.",
            "memory_description": "Magical moments at the Meiji Shrine.",
            "owner_id": 2,
            "journal_image": "https://blog.japanwondertravel.com/wp-content/uploads/2021/03/1582531_l-scaled.jpg",
            "secondary_image": "https://cdn.portico.travel/i/v1.328833.jpg",
            "third_image": "https://media.timeout.com/images/105578156/750/422/image.jpg",
            "fourth_image": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
            "arrival_date": "2023-07-10",
            "departure_date": "2023-07-18",
            "food_review": 5,
            "sight_seeing_review": 5,
            "drinks_review": 4,
            "friendliness_review": 4,
            "cleanliness_review": 5,
        },
        {
            "name": "Beach Paradise in Bali",
            "country_name": "Indonesia",
            "country_flag_image": "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
            "note_description": "Relaxing and unwinding on Bali's beautiful beaches.",
            "memory_description": "Sunset views from Kuta Beach were breathtaking.",
            "owner_id": 3,
            "journal_image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Sunset_Pink_in_Kuta_Beach.jpg",
            "secondary_image": "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revisi-2020/destinations-thumbnail/Bali-Thumbnail.jpg",
            "third_image": "https://www.affordableluxurytravel.co.uk/blog/wp-content/uploads/2021/11/AdobeStock_103587221-scaled.jpeg",
            "fourth_image": "https://media.digitalnomads.world/wp-content/uploads/2021/01/20120709/bali-for-digital-nomads.jpg",
            "arrival_date": "2023-09-05",
            "departure_date": "2023-09-12",
            "food_review": 4,
            "sight_seeing_review": 5,
            "drinks_review": 5,
            "friendliness_review": 5,
            "cleanliness_review": 4,
        },
        
    ]:
        db.session.add(Journal(**journal))


    db.session.commit()

    print("Journal seeding completed.")


def undo_journals():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()