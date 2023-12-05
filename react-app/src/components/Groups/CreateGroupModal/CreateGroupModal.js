import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../../context/Modal';
import { createGroupThunk } from '../../../store/group';
import { loadUserGroupsThunk } from "../../../store/group";
const CreateGroupModal = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const { closeModal } = useModal();
    const [group_name, setGroup_name] = useState('');
    const [group_description, setGroup_description] = useState('');
    const [group_image, setGroup_image] = useState(null);
    const [error, setError] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!group_name.length || group_name.length > 255)
            newErrors.push('Name must be between 1 and 255 characters');
        
        if (!group_description.length || group_description.length > 255)
            newErrors.push("Group's description must be between 1 and 255 characters");
        
        if (!group_image)
            newErrors.push('Please add an image');
        if (newErrors.length) {
            setError(newErrors);
            setDisableButton(true);
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

    useEffect(() => {
        setDisableButton(false);
        const newErrors = [];
        if (!group_name.length || group_name.length > 255)
            newErrors.push('Name must be between 1 and 255 characters');
       
        if (!group_description.length || group_description.length > 255)
            newErrors.push('Description for group must be between 1 and 255 characters');
       

        if (!group_image)
            newErrors.push('Please add an image');

        if (newErrors.length) setDisableButton(true);
    }, [group_name, group_description, group_image]);

    return (
        <div className='groupcreateback'>
            <div className='create-wrapper'>
                <h1>Create a Group</h1>
                {error.length
                    ? error.map((e, index) => <p key={index} className='create-error'>{e}</p>)
                    : null}

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
                    <input
                        type='text'
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

                    <button
                        className=''
                        id='group-form-submit-button'
                        type='submit'
                        disabled={disableButton}
                    >
                        Create Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;