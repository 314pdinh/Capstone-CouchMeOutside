from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():
    
    print("Seeding comments ...")

    comment1 = Comment(
        text='This looks like a fantastic activity!',
        owner_id=1,
        group_id=1,
    )

    comment2 = Comment(
        text='I would love to join this group activity!',
        owner_id=2,
        group_id=1,
    )

    comment3 = Comment(
        text='Great idea for a beach picnic!',
        owner_id=3,
        group_id=2,
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

    print("Comment seeding completed....")

    return [comment1, comment2, comment3]

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
