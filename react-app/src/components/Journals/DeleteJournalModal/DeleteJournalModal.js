import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { deleteJournalThunk, loadUserJournalsThunk } from '../../../store/journal';

const DeleteJournalModal = ({ journal }) => {
    // console.log('id HERE:', journal.id)
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteJournalThunk(journal.id))
        history.push("/account")
        closeModal()
        dispatch(loadUserJournalsThunk(user.id));
    }


    return (
        <div className='delete-group-wrapper'>
            <h2 className="delete-group-header">Are you sure you want to delete this journal?</h2>
            <h2 className='warning'>This can't be undone</h2>
            <form onSubmit={handleSubmit}>
                <div className='delete-buttons-container'>
                    <div className="delete-button">
                        <button type="submit">Yes(Delete Journal)</button>
                    </div>
                    <div className="create-button">
                        <button onClick={closeModal}>No(Keep Journal)</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DeleteJournalModal;