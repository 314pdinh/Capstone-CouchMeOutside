import React, { useState, useEffect } from 'react';
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { createActivityThunk } from '../../../store/activity';
import { loadSingleGroupThunk } from '../../../store/group';

function AddGroupActivityModal({ group }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [activity_name, setActivity_name] = useState("");
    const [activity_description, setActivity_description] = useState("");
    const [activity_image, setActivity_image] = useState("");
    const [error, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!activity_name.length || activity_name.length < 5 || activity_name.length > 35)
            newErrors.push('Name must be between 5 and 35 characters');

        if (!activity_description.length || activity_description.length < 25 || activity_description.length > 255)
            newErrors.push("Activity's description must be between 25 and 255 characters");

        if (!activity_image)
            newErrors.push('Please add an image');
        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        const form = new FormData();
        form.append('activity_name', activity_name);
        form.append('activity_description', activity_description);
        form.append('activity_image', activity_image);

        dispatch(createActivityThunk(form, group.id)).then((responseData) => {
            if (responseData.error) {
                console.log('creating activity error')
                setError(responseData.error);
            } else {
                closeModal();
                dispatch(loadSingleGroupThunk(group.id));
            }
        });
    };


    return (
        <div className='activity-create-wrapper'>
            <div className='create-wrapper'>
                <h1>Create an Activity</h1>
                <ul>
                    {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))}
                </ul>

                <form className='form-box' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label htmlFor='activity-create-name'>Activity Name<i style={{ color: 'red' }}>*</i></label>
                    <input
                        type='text'
                        value={activity_name}
                        required
                        onChange={(e) => setActivity_name(e.target.value)}
                        placeholder='What would you like to call this activity?'
                    />


                    <label htmlFor='journal-create-description'>Activity Description <i style={{ color: 'red' }}>*</i></label>
                    <input
                        type='textarea'
                        value={activity_description}
                        required
                        onChange={(e) => setActivity_description(e.target.value)}
                        placeholder='Describe your activity'
                    />


                    <label htmlFor='journal-create-image'>New Activity Image <i style={{ color: 'red' }}>*</i></label>
                    <input
                        type='file'
                        name='activity-form-activity-image'
                        required
                        onChange={(e) => setActivity_image(e.target.files[0])}
                        accept='image/*'
                    />

                    <div className='create-button'
                    >

                        <button
                            className='create-button'
                            id='activity-form-submit-button'
                            type='submit'
                        >
                            Create Activity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default AddGroupActivityModal;