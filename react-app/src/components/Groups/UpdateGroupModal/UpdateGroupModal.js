import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateGroupThunk, loadUserGroupsThunk, loadSingleGroupThunk } from '../../../store/group';
import './UpdateGroupModal.css';

const GroupUpdateModal = ({ singleGroup }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [group_name, setGroup_name] = useState(singleGroup.group.group_name);
    const [group_description, setGroup_description] = useState(singleGroup.group.group_description);
    const [group_image, setGroup_image] = useState();
    const [error, setError] = useState([]);
    const user = useSelector((state) => state.session.user);


    // console.log('this is the Grouppp HEREEEEE', singleGroup)
    // console.log('this is the GroupppNAME HEREEEEE', singleGroup.group.group_name)
    // console.log('this is the GroupppDescription HEREEEEE', singleGroup.group.group_description)
    // console.log('this is the GroupppIDDD HEREEEEE', singleGroup.group.id)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (!group_name.length || group_name.length < 5 || group_name.length > 35)
            newErrors.push('Name must be between 5 and 35 characters');

        if (!group_description.length || group_description.length < 25 || group_description.length > 255)
            newErrors.push("Group's description must be between 25 and 255 characters");

        if (newErrors.length) {
            setError(newErrors);
            return;
        }

        // console.log('Data send is in groupapidPUT request:', {
        //     group_name,
        //     group_description,
        //     group_image
        // });
        // console.log('singleGroup:', singleGroup);
        // console.log('ID from singleGroup:', singleGroup.group.id);

        const form = new FormData();
        form.append('group_name', group_name);
        form.append('group_description', group_description);
        form.append('group_image', group_image);
        form.append("groupId", singleGroup.group.id);
        // console.log('Form data ---- handleSubmit:', form);

        dispatch(updateGroupThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error);
            } else {
                // console.log('Update successful. Response data:', responseData);
                // console.log('------Response data GROUP ID-------', responseData['updated group'].id);
                const updatedGroupId = responseData['updated group'].id;
                history.push(`/groups/${updatedGroupId}`);
                closeModal();
                dispatch(loadSingleGroupThunk(updatedGroupId))
            }
        });
    };



    if (!singleGroup) return null;

    return (
        <div className="update-wrapper">
            <h1>Update Group</h1>
            <form className="form-boxx" onSubmit={handleSubmit} encType="multipart/form-data">
                <ul>
                    {error.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))}
                </ul>

                <label htmlFor="group-description">New Group Name</label>
                <input
                    type="textarea"
                    value={group_name}
                    onChange={(e) => setGroup_name(e.target.value)}
                />

                <label htmlFor="group-description">New Group Description</label>
                <textarea
                    value={group_description}
                    onChange={(e) => setGroup_description(e.target.value)}
                ></textarea>

                <label htmlFor="group-image">New Group Image</label>
                <input
                    type="file"
                    onChange={(e) => setGroup_image(e.target.files[0])}
                    accept="image/*"
                ></input>

                <div className='update-button'>
                    <button type="submit" className="updbtn">
                        Update Group
                    </button>
                </div>
            </form>
        </div>
    );

}

export default GroupUpdateModal;