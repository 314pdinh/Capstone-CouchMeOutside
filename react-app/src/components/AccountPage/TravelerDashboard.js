import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserGroupsThunk } from '../../store/group';
import { loadUserJournalsThunk } from '../../store/journal';
import CreateGroupModal from "../Groups/CreateGroupModal/CreateGroupModal";
import OpenModalButton from '../OpenModalButton';
import './TravelerDashboard.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { logout } from "../../store/session";

import { Link, useHistory } from "react-router-dom";

const AccountPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    // console.log('this is the user', user)
    const allGroups = useSelector((state) => state.groups.allGroups);
    const allJournals = useSelector((state) => state.journals.allJournals);

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

    const userJournals = Object.values(allJournals).filter(
        (journal) => journal.ownerId === user.id
    );

    const userId = user.id;

    useEffect(() => {
        dispatch(loadUserGroupsThunk(user.id));
        dispatch(loadUserJournalsThunk(user.id));
    }, [dispatch, user.id]);

    // console.log('User data:', user);

    // console.log('allGroups:', allGroups);
    // console.log('userGrops:', userGroups);

    // console.log('allJournals:', allJournals);
    // console.log('userJournals:', userJournals);

    const settings = {
        dots: true,
        // infinite: true,
        infinite: userJournals.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

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



                    <div className="user-journals-container">
                        <h3>Your Journal(s)</h3>
                        <div className="new-journal-section">
                            <li className="create-button">
                                {/* <OpenModalButton
                                    modalComponent={<CreateJournalModal title="Create Journal" />}
                                    buttonText="Create Journal"
                                    className="open-create-server"
                                /> */}

                                <button onClick={
                                    (e) => {
                                        e.preventDefault();
                                        history.push('/journals/new');
                                    }
                                }> Create Journal </button>
                            </li>
                        </div>
                        {userJournals.length === 0 ? (
                            <p>You have not created any journals yet.</p>
                        ) : (
                            <div className="slider-carousel">
                                <Slider {...settings}>
                                    {userJournals.map((journal) => (
                                        <div key={journal.id} className="user-journal-box">
                                            <Link to={`/journals/${journal.id}`} className="user-journal-link">
                                                <div className="user-journal-image">
                                                    <img src={journal.journalImage} alt={journal.name} />
                                                </div>
                                                <div className="user-journal-details">
                                                    <p className="user-journal-name">{journal.name}</p>
                                                    {/* <p className="user-journal-note-description">{journal.noteDescription}</p>
                                                    <p className="user-journal-memory-">{journal.memoryDescription}</p> */}
                                                </div>
                                            </Link>


                                        </div>
                                    ))}
                                </Slider>
                            </div>

                        )}

                    </div>



                    <div className="user-groups-container">
                        <h3>Your Group(s):</h3>

                        <li className="create-button">
                            <OpenModalButton
                                modalComponent={<CreateGroupModal title="Create Group" />}
                                buttonText="Create Group"
                                className="open-create-server"
                            />
                        </li>

                        {userGroups.length === 0 ? (
                            <p>You have not created any group or part of any group yet.</p>
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
                    </div>

                </div>


            </div>
        </div>

    );
};

export default AccountPage;