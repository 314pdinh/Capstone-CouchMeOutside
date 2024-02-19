import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { updateCommentThunk } from '../../../store/comment';
import { loadSingleGroupThunk } from '../../../store/group';

const UpdateCommentModal = ({ comment, groupId }) => {
    // console.log('this is comment update modal ', comment)

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [text, setText] = useState(comment.text);
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!text.length)
            newErrors.push('Please enter a text, or type deleted');

        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('text', text);
        formData.append('commentId', comment.id);

        dispatch(updateCommentThunk(formData)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error);
            } else {
                history.push(`/groups/${groupId}`);
                closeModal();
                dispatch(loadSingleGroupThunk(groupId));
            }
        });
    };

    return (
        <div className="update-wrapper">
            <h1>Update Comment</h1>
            <form className="form-boxx" onSubmit={handleSubmit} encType="multipart/form-data">
                <ul>
                    {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))}
                </ul>
                <label htmlFor="comment-text">New Comment Text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="update-button">
                    <button type="submit" className="updbtn">
                        Update Comment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCommentModal;
