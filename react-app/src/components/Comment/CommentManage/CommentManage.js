import React from 'react';
import OpenModalButton from "../../OpenModalButton";
import { useHistory } from 'react-router-dom';
import UpdateCommentModal from "../UpdateCommentModal/UpdateCommentModal";
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";

const CommentManage = ({ commentId, groupId, comment }) => {
  // console.log('this is comment manage ', commentId)
  // console.log('this is comment manage ', groupId)
  // console.log('this is comment manage ', comment)

  return (
    <div className="manage-container-group">
      <h1 className="manage-header">Manage Comment</h1>
      <div className="manage-buttons-format">
        <div className="update-button">
          <OpenModalButton
            className="comment-button"
            id='update'
            buttonText='Update Comment'
            modalComponent={<UpdateCommentModal title='Update Comment' comment={comment} groupId={groupId} />}
          />
        </div>
        <div className="delete-button">
          <OpenModalButton
            className="comment-button"
            id="delete"
            buttonText='Delete Comment'
            modalComponent={<DeleteCommentModal type="comment" commentId={commentId} groupId={groupId} />}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentManage;
