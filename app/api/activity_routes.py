from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import  db, GroupMember, Activity
from app.forms import CreateActivityForm, UpdateActivityForm
from .auth_routes import validation_errors_to_error_messages
# from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

activity_routes = Blueprint("activities", __name__)

@activity_routes.route('/<int:groupId>')
@login_required
def get_current_activities(groupId):
    """
    This route will return a list of activities of the current group.
    """
    current_group_activities = Activity.query.filter_by(group_id=groupId).all()
    return {"group_activities":{activity.id: activity.to_dict() for activity in current_group_activities}}

@activity_routes.route('/<int:groupId>/new', methods=['POST'])
@login_required
def create_new_activity(groupId):
    """
    This route will create a new activity for the current group.
    """
    form = CreateActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    groupMembers = GroupMember.query.filter_by(group_id = groupId).all()
    number_of_group_members =  GroupMember.query.filter_by(group_id = groupId).count()

    
    if current_user.id not in [member.user_id for member in GroupMember.query.filter_by(group_id = groupId).all()]:
        return {'error': 'Must be member of group to post a new activity.'}
    
    if form.validate_on_submit():
        
        newActivity = Activity (
            owner_id = current_user.id,
            group_id = groupId,
            activity_name = form.data['activity_name'],
            activity_description = form.data['activity_description'],
        )
        
        # activity_image = form.data["activity_image"]
        # activity_image.filename = get_unique_filename(activity_image.filename)
        # uploadActivityImage = upload_file_to_s3(activity_image)

        # if 'url' not in uploadActivityImage:
        #         print(uploadActivityImage)
        #         return uploadActivityImage
        # else:
        #     newActivity.activity_image = uploadActivityImage['url']
        
        db.session.add(newActivity)
        db.session.commit()
        
        return {"activity": newActivity.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@activity_routes.route('/<int:activityId>/update', methods=['PUT'])
@login_required
def update_activity(activityId):
    """
    This route will update a group's description, amount, and category.
    """
    activity_to_update = Activity.query.get(activityId)
    form = UpdateActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    if current_user.id != activity_to_update.owner_id:
        return {'error': 'Must be owner of this activity to update it.'}
    
    if form.validate_on_submit():
        activity_to_update.activity_name = form.data['activity_name']
        activity_to_update.activity_description = form.data['activity_description']
        
        # activity_image = form.data['activity_image']
        # if activity_image:
        #     activity_image.filename = get_unique_filename(activity_image.filename)
        #     uploadActivityImage = upload_file_to_s3(activity_image)
        #     if 'url' in uploadActivityImage:
        #         activity_to_update.activity_image = uploadActivityImage['url']
        
        db.session.commit()
        
        return {"activity": activity_to_update.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        
@activity_routes.route("/<int:activityId>/delete", methods=['DELETE'])
@login_required
def delete_activity(activityId):
    """
    This route will delete an activity.
    """
    activity_to_delete = Activity.query.get(activityId)

    if current_user.id != activity_to_delete.owner_id:
        return {'error': 'unathorized access'}, 403
    db.session.delete(activity_to_delete)
    db.session.commit()
    return {'message': 'activity successfully deleted'}, 200


# @activity_routes.route("/<int:activityId>")
# @login_required
# def get_single_activity_details(activityId):
#     """
#     This route will return a single activity.
#     """
#     activity = Activity.query.get(activityId)
#     if activity is None:
#         return jsonify({'message': "Activity doesn't exist"}), 404
#     return {"activity": activity.to_dict()}
    