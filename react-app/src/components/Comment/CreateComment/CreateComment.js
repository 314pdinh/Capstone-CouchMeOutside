import React, { useState } from 'react';
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { createCommentThunk } from '../../../store/comment';
import { loadSingleGroupThunk } from '../../../store/group';
// import './CreateComment.css';

function CreateCommentModal({ group }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [text, setText] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!text.length)
      newErrors.push("Comment cannot be empty");

    if (newErrors.length) {
      setError(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('text', text);

    dispatch(createCommentThunk(formData, group.id)).then((responseData) => {
      if (responseData.error) {
        // console.log('creating comment error', responseData.error)
        setError(responseData.error);
      } else {
        closeModal();
        dispatch(loadSingleGroupThunk(group.id));
      }
    });
  };

  return (
    <div className="comment-create-wrapper">
      <div className="create-wrapper">
        <h1>Create a Comment</h1>
        <ul>
          {error.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>

        <form className="form-box" onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="comment-create-text">Comment Text</label>
          <textarea
            type="textarea"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
            placeholder="comment here"
          />

          <div className="create-button">
            <button className="create-button" type="submit">
              Create Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCommentModal;
