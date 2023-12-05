import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from '../../store/user';
import './TravelersProfile.css';

const TravelersProfile = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    if (!users || Object.keys(users).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="travelers-profile-container">
            <h2>All Travelers</h2>
            <ul className="user-list">
                {Object.values(users).map((user) => (
                    <li key={user.id} className="user-item">
                        <img src={user.profilePic} alt="Profile" className="user-avatar" />
                        <div className="user-details">
                            <h2 className="user-username">{user.username}</h2>
                            <p className="user-email">Email: {user.email}</p>
                            <p className="user-bio">Bio: {user.bio}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelersProfile;
