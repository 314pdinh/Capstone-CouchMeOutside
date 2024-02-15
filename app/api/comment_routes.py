from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, GroupMember, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

comment_routes = Blueprint("comments", __name__)

@comment_routes.route('/<int:groupId>')
@login_required
def get_comments_by_group(groupId):
    """
    This route will return a list of comments for the current group.
    """
    comments = Comment.query.filter_by(group_id=groupId).all()
    return {"group_comments": {comment.id: comment.to_dict() for comment in comments}}

@comment_routes.route('/<int:groupId>/new', methods=['POST'])
@login_required
def create_new_comment(groupId):
    """
    This route will create a new comment for the current group.
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    group_members = GroupMember.query.filter_by(group_id=groupId).all()
    
    if current_user.id not in [member.user_id for member in group_members]:
        return {'error': 'Must be a member of the group to post a new comment.'}
    
    if form.validate_on_submit():
        new_comment = Comment(
            owner_id=current_user.id,
            group_id=groupId,
            text=form.data['text'],
        )
        
        db.session.add(new_comment)
        db.session.commit()
        
        return {"comment": new_comment.to_dict()}
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:commentId>/update', methods=['PUT'])
@login_required
def update_comment(commentId):
    """
    This route will update a comment.
    """
    comment_to_update = Comment.query.get(commentId)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if not current_user.is_authenticated:
        return {'error': 'unauthorized access'}
    
    if current_user.id != comment_to_update.owner_id:
        return {'error': 'Must be owner of this comment to update it.'}
    
    if form.validate_on_submit():
        comment_to_update.text = form.data['text']
        db.session.commit()
        return {"comment": comment_to_update.to_dict()}
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route("/<int:commentId>/delete", methods=['DELETE'])
@login_required
def delete_comment(commentId):
    """
    This route will delete a comment.
    """
    comment_to_delete = Comment.query.get(commentId)

    if current_user.id != comment_to_delete.owner_id:
        return {'error': 'unauthorized access'}, 403
    
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {'message': 'comment successfully deleted'}, 200
