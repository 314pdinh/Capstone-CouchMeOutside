import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateGroupThunk, loadUserGroupsThunk, loadSingleGroupThunk } from '../../../store/group';
import { updateActivityThunk, loadUserActivitiesThunk, loadSingleActivityThunk } from '../../../store/activity';

const ActivityUpdateModal = ({ activity, groupId }) => {
    console.log('activityUpdateModal activity', activity)
    console.log('activityUpdateModal groupID', groupId)

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [activity_name, setActivity_name] = useState(activity.activity_name);
    const [activity_description, setActivity_description] = useState(activity.activity_description);
    const [activity_image, setActivity_image] = useState();
    const [error, setError] = useState([]);
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!activity_name.length || activity_name.length < 5 || activity_name.length > 35)
            newErrors.push('Name must be between 5 and 35 characters');

        if (!activity_description.length || activity_description.length < 25 || activity_description.length > 255)
            newErrors.push("Activity's description must be between 25 and 255 characters");

        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        const form = new FormData();
        form.append('activity_name', activity_name);
        form.append('activity_description', activity_description);
        form.append('activity_image', activity_image);
        form.append("activityId", activity.id);
        console.log('Form data ---- handleSubmit:', form);

        dispatch(updateActivityThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error);
            } else {
                history.push(`/groups/${groupId}`);
                closeModal();
                dispatch(loadSingleGroupThunk(groupId))
            }
        });
    };


    if (!activity) return null;

    return (
        <div className="update-wrapper">
            <h1>Update Activity</h1>
            <form className="form-boxx" onSubmit={handleSubmit} encType="multipart/form-data">
                <ul>
                    {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))}
                </ul>
                <label htmlFor="activity-description">New Activity Name</label>
                <input
                    type="text"
                    value={activity_name}
                    onChange={(e) => setActivity_name(e.target.value)}
                />

                <label htmlFor="activity-description">New Activity Description</label>
                <input
                    type="text"
                    value={activity_description}
                    onChange={(e) => setActivity_description(e.target.value)}
                />

                <label htmlFor="activity-image">New Activity Image</label>
                <input
                    type="file"
                    onChange={(e) => setActivity_image(e.target.files[0])}
                    accept="image/*"
                ></input>


                <button type="submit" className="updbtn"
                >
                    Update Activity
                </button>
            </form>
        </div>
    );

}

export default ActivityUpdateModal;