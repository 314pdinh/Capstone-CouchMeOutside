from flask import Blueprint, request, jsonify
from app.models.activity import Activity
from flask_login import current_user, login_required
from app.models import Group, db, User, GroupMember
from app.forms import GroupForm, AddMembersForm
from .auth_routes import validation_errors_to_error_messages
# from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

group_routes = Blueprint("groups", __name__)

@group_routes.route('/current', methods=['GET'])
@login_required
def get_current_groups():
    """
    This route will return a list of groups (and associated members) the current user is part of.
    """
    user_groups = Group.query.join(Group.group_members).filter(GroupMember.user_id == current_user.id).all()
    # return {"user_groups":{group.id: group.to_dict() for group in user_groups} }
    return jsonify([group.to_dict() for group in user_groups])

@login_required
@group_routes.route('/create', methods=['POST'])
def create_group():
    """
    Create a new group and allow the logged in owner to add member(s)
    """
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    if form.validate_on_submit():
        
        newGroup = Group (
            group_name = form.data['group_name'],
            group_description = form.data['group_description'],
            owner_id = current_user.id
        )
        
        # group_image = form.data["group_image"]
        # group_image.filename = get_unique_filename(group_image.filename)
        # uploadGroupImage = upload_file_to_s3(group_image)

        # if 'url' not in uploadGroupImage:
        #         print(uploadGroupImage)
        #         return uploadGroupImage
        # else:
        #     newGroup.group_image = uploadGroupImage['url']

        
        db.session.add(newGroup)
        db.session.add(GroupMember(user=current_user, group=newGroup))
        db.session.commit()
        return {"new_group": newGroup.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        
@group_routes.route('/<int:groupId>/members', methods=['POST'])
@login_required
def add_members(groupId):
    """
    This route will add member to group.
    """
    group = Group.query.get(groupId)
    # groupActivities = Activity.query.filter_by(group_id=groupId).all()
    
    if current_user.id != group.owner_id:
        return {'error': 'unathorized access'}, 403
    form = AddMembersForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    if form.validate_on_submit():
        username =  form.data['username']
        user = User.query.filter_by(username=username).first()
        groupmember = GroupMember.query.filter_by(user=user, group=group).first()
        if groupmember:
            return {"error": "user already added to this group"}
        if user is None:
            return {"error": "user does not exist"}, 404
        db.session.add(GroupMember(user=user, group=group))
        db.session.commit()
        return {"group": group.to_dict()}

@group_routes.route('/<int:groupId>/members', methods=['DELETE'])
@login_required
def remove_members(groupId):
    """
    This route will remove member from the group.
    """
    group = Group.query.get(groupId)
    # groupActivities = Activity.query.filter_by(group_id=groupId).all()

    
    form = AddMembersForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if current_user.id != group.owner_id:
        return {'error': 'unathorized access'}, 403
    if form.validate_on_submit():
        username = form.data['username']
        user = User.query.filter_by(username=username).first()
        
        if user is None:
            return {"error": "User does not exist"}, 404
        
        groupmember = GroupMember.query.filter_by(user=user, group=group).first()
        
        if groupmember is None:
            return {"error": "Group member does not exist"}, 404

        db.session.delete(groupmember)
        # update_settlement_transactions(groupId)
        db.session.commit()
        return {'message': 'Group member successfully deleted'}, 200

@group_routes.route("/<int:groupId>/update", methods=['PUT'])
@login_required
def update_group(groupId):
    """
    This route will update a group, specifically it's group_description.
    """
    
    print('Update Group API Route RUNNNNN')
    print('Group ID:', groupId)
    print('Current ----User ID:', current_user.id)

    group = Group.query.get(groupId)
    
    if current_user.id != group.owner_id:
        return jsonify({"message": 'You do not have permission to edit this group'}), 403
    
    group_to_update = Group.query.get(groupId)

    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        print('Received datafrom api routesSSS:', form.data)
        group_to_update.group_name = form.data['group_name']
        group_to_update.group_description = form.data['group_description']
        
        group_image = form.data['group_image']
        # if group_image:
        #     group_image.filename = get_unique_filename(group_image.filename)
        #     uploadGroupImage = upload_file_to_s3(group_image)
        #     if 'url' in uploadGroupImage:
        #         group.group_image = uploadGroupImage['url']
        
        db.session.commit()
        print('UPDATED GROUPPPPPPPPP :', group_to_update.to_dict())
        return {"updated group": group_to_update.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@group_routes.route("/<int:groupId>/delete", methods=['DELETE'])
@login_required
def delete_group(groupId):
    """
    This route will delete a group.
    """
    group_to_delete = Group.query.get(groupId)

    if current_user.id != group_to_delete.owner_id:
        return {'error': 'unathorized access'}, 403
    db.session.delete(group_to_delete)
    db.session.commit()
    return {'message': 'group successfully deleted'}, 200


@group_routes.route("/<int:groupId>")
@login_required
def get_single_group_details(groupId):
    """
    This route will return a single group (and associated members).
    """
    group = Group.query.join(Group.group_members).filter(Group.id == groupId).first()
    if group is None:
        return jsonify({'message': "Group doesn't exist"}), 404
    return {"group": group.to_dict()}
    
