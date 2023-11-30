from app.models import db, GroupMember, environment, SCHEMA
from sqlalchemy.sql import text

def seed_groupmembers(users, groups):
    
    
    if not users:
        print("No users. Users list is empty.")
        # return
    
    if not groups:
        print("---------------------No groups. Groups list is empty.--------------------------")
        # return
    
    print("Seeding group members...")
    
    
    groupmember1 = GroupMember(
        user=users[0],
        group=groups[0]
    )

    groupmember2 = GroupMember(
        user=users[1],
        group=groups[0]
    )

    groupmember3 = GroupMember(
        user=users[2],
        group=groups[0]
    )

    groupmember4 = GroupMember(
        user=users[3],
        group=groups[0]
    )

    groupmember5 = GroupMember(
        user=users[4],
        group=groups[0]
    )

    groupmember6 = GroupMember(
        user=users[0],
        group=groups[1]
    )

    groupmember7 = GroupMember(
        user=users[1],
        group=groups[1]
    )

    groupmember8 = GroupMember(
        user=users[2],
        group=groups[1]
    )

    groupmember9 = GroupMember(
        user=users[0],
        group=groups[2]
    )

    groupmember10 = GroupMember(
        user=users[1],
        group=groups[2]
    )

    group_members = [
        groupmember1,
        groupmember2,
        groupmember3,
        groupmember4,
        groupmember5,
        groupmember6,
        groupmember7,
        groupmember8,
        groupmember9,
        groupmember10,
    ]
    for group_member in group_members:
        db.session.add(group_member)

    db.session.commit()

    print("Group members seeded successfully.")

def undo_groupmembers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_members"))

    db.session.commit()