from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .groupmembers import seed_groupmembers, undo_groupmembers
from .activities import seed_activities, undo_activities
from .journals import seed_journals, undo_journals
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_journals()
        undo_comments()
        undo_activities()
        undo_groupmembers()
        undo_groups()
        undo_users()
   
    users = seed_users()
    print('here are the users-------', users)
    groups = seed_groups()
    print('here is the groups ----------', groups)
    seed_groupmembers(users, groups)
    seed_journals()
    seed_activities()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_journals()
    undo_comments()
    undo_activities()
    undo_groupmembers()
    undo_groups()
    undo_users()
    # Add other undo functions here