import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { deleteActivityThunk } from '../../../store/activity';
import { loadSingleGroupThunk } from '../../../store/group';


const DeleteActivityModal = ({ id, groupId }) => {
    // console.log('id HERE from delete activity MODAL:', id)
    // console.log('groupId HERE from delete activity MODAL:', groupId)

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteActivityThunk(id))
        history.push(`/groups/${groupId}`);
        closeModal()
        dispatch(loadSingleGroupThunk(groupId));
    }


    return (
        <div className='delete-group-wrapper'>
            <h2 className="delete-group-header">Are you sure you want to delete this activity?</h2>
            <h2 className='warning'>This can't be undone</h2>
            <form onSubmit={handleSubmit}>

                <div className='delete-buttons-container'>
                    <div className="delete-button">
                        <button type="submit">Yes(Delete Activity)</button>
                    </div>
                    <div className="create-button">
                        <button onClick={closeModal}>No(Keep Activity)</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DeleteActivityModal;