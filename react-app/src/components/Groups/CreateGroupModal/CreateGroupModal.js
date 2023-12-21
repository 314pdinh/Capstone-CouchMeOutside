import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../../context/Modal';
import { createGroupThunk } from '../../../store/group';
import { loadUserGroupsThunk } from "../../../store/group";
import './CreateGroupModal.css';

const CreateGroupModal = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const { closeModal } = useModal();
    const [group_name, setGroup_name] = useState('');
    const [group_description, setGroup_description] = useState('');
    const [group_image, setGroup_image] = useState(null);
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!group_name.length || group_name.length < 5 || group_name.length > 35)
            newErrors.push('Name must be between 5 and 35 characters');

        if (!group_description.length || group_description.length < 25 || group_description.length > 255)
            newErrors.push("Group's description must be between 25 and 255 characters");

        if (!group_image)
            newErrors.push('Please add an image');
        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        const form = new FormData();
        form.append('group_name', group_name);

        form.append('group_description', group_description);
        form.append('group_image', group_image);

        dispatch(createGroupThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error);
            } else {
                history.push(`/account`);
                closeModal();
                dispatch(loadUserGroupsThunk(user.id));
            }
        });
    };

    return (
        <div className='activity-create-wrapper'>
            <div className='create-wrapper'>
                <h1>Create a Group</h1>
                <ul>
                    {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))}
                </ul>

                <form className='form-box' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label htmlFor='group-create-name'>Group Name <i style={{ color: 'red' }}>*</i></label>
                    <input
                        type='text'
                        value={group_name}
                        required
                        onChange={(e) => setGroup_name(e.target.value)}
                        placeholder='What would you like to call this group?'
                    />


                    <label htmlFor='group-create-description'>Group Description <i style={{ color: 'red' }}>*</i></label>
                    <textarea
                        type='textarea'
                        value={group_description}
                        required
                        onChange={(e) => setGroup_description(e.target.value)}
                        placeholder='Describe your group'
                    />


                    <label htmlFor='group-create-image'>New Group Image <i style={{ color: 'red' }}>*</i></label>
                    <input
                        type='file'
                        name='group-form-group-image'
                        required
                        onChange={(e) => setGroup_image(e.target.files[0])}
                        accept='image/*'
                    />
                    <div className='create-button'
                    >
                        <button
                            id='group-form-submit-button'
                            type='submit'
                        >
                            Create Group
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;