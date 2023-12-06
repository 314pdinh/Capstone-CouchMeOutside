import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserGroupsThunk } from '../../store/group';
import CreateGroupModal from "../Groups/CreateGroupModal/CreateGroupModal";
import OpenModalButton from '../OpenModalButton';
import './TravelerDashboard.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


// import { logout } from "../../store/session";

import { Link, useHistory } from "react-router-dom";

const AccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    console.log('this is the user', user)
    const allGroups = useSelector((state) => state.groups.allGroups);

    const userOwnedGroups = Object.values(allGroups).filter(
        (group) => group.owner_id === user.id
    );

    const userMemberGroups = Object.values(allGroups).filter(
        (group) => Array.isArray(group.members) && group.members.includes(user.username)
    );

    // const userGroups = [...userOwnedGroups, ...userMemberGroups];
    const userGroupsObj = [...userOwnedGroups, ...userMemberGroups].reduce((account, group) => {
        account[group.id] = group;
        return account;
    }, {});

    const userGroups = Object.values(userGroupsObj);


    const userId = user.id;

    useEffect(() => {
        dispatch(loadUserGroupsThunk(user.id));
    }, [dispatch, user.id]);

    console.log('User data:', user);

    console.log('allGroups:', allGroups);
    console.log('userGrops:', userGroups);

    if (!allGroups) return null;

    return (
        <div className="account-outer-container">
            <h2>Welcome to Your Story, @{user.username}!</h2>
            <div className="account-page-container">

                <div className="user-info-section">
                    <div className="images-carousel">
                        <Carousel>
                            <div className="profile-picture-container">
                                <img className="profile-picture" src={user.profilePic} alt="Profile" />
                            </div>
                            <div className="profile-picture-container">
                                <img className="profile-picture" src={user.profile_img1} alt="Profile" />
                            </div>
                            <div className="profile-picture-container">
                                <img className="profile-picture" src={user.profile_img2} alt="Profile" />
                            </div>
                        </Carousel>
                    </div>

                    <h2 className="section-title" style={{ textTransform: 'capitalize' }}>{user.username}</h2>
                    <h3 className="info-item">{user.email}</h3>

                    <div className="account-page-container">

                        <div className="users-bio">
                            <p>{user.bio}</p>
                        </div>
                    </div>



                </div>

                <div className="users-content-account">

                    <div className="user-groups-container">
                        <h3>Your Group(s):</h3>
                        {userGroups.length === 0 ? (
                            <p>You have not added any groups yet.</p>
                        ) : (
                            <div className="users-groups-boxes">

                                {userGroups.map((group) => (
                                    <div key={group.id} className="user-group-box">
                                        <Link to={`/groups/${group.id}`} className="user-group-link">
                                            <div className="user-group-image">
                                                <img src={group.group_image} alt={group.group_name} />
                                            </div>
                                            <div className="user-group-details">
                                                <p className="user-group-name">{group.group_name}</p>
                                                {/* <p className="user-group-description">{group.group_description}</p> */}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                        )}

                        <div className="new-group-section">
                            <h1>New Group?</h1>
                            <li className="create-button">

                                <OpenModalButton
                                    modalComponent={<CreateGroupModal title="Create Group" />}
                                    buttonText="Create Group"
                                    className="open-create-server"
                                />

                            </li>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
};

export default AccountPage;