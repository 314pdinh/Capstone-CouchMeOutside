import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { deleteCommentThunk, loadGroupCommentsThunk } from '../../../store/comment';
import { loadSingleGroupThunk } from '../../../store/group';

const DeleteCommentModal = ({ commentId, groupId }) => {
  // console.log('id HERE from delete comment MODAL:', commentId)
  // console.log('groupId HERE from delete comment MODAL:', groupId)

  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCommentThunk(commentId));
    history.push(`/groups/${groupId}`);
    closeModal();
    dispatch(loadSingleGroupThunk(groupId));
  };

  return (
    <div className='delete-comment-wrapper'>
      <h2 className="delete-comment-header">Are you sure you want to delete this comment?</h2>
      <h2 className='warning'>This action cannot be undone</h2>
      <form onSubmit={handleSubmit}>
        <div className='delete-buttons-container'>
          <div className="delete-button">
            <button type="submit">Yes (Delete Comment)</button>
          </div>
          <div className="create-button">
            <button onClick={closeModal}>No (Keep Comment)</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteCommentModal;
