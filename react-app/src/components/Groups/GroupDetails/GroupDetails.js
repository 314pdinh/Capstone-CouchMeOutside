
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleGroupThunk } from "../../../store/group";
import OpenModalButton from '../../OpenModalButton';
import GroupManage from "../GroupManage/GroupManage";
import './GroupDetails.css';

import { getAllUsersThunk } from '../../../store/user';

// Activities
import ActivityManage from "../../Activity/ActivityManage/ActivityManage";
import AddGroupActivityModal from "../../Activity/CreateActivity/CreateActivity";


const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();

    // const group = useSelector((state) => state.groups.allGroups.id);
    const singleGroup = useSelector((state) => state.groups.singleGroup);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadSingleGroupThunk(groupId));
        // dispatch(loadGroupActivitiesThunk(groupId));
    }, [dispatch, groupId]);

    const users = useSelector((state) => state.users.users);
    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    // console.log('usersssss,----', users)

    // console.log('groupID HEREEEE', groupId)
    // console.log('ONE singleGroup:', singleGroup);
    // console.log('USER HERE:', user);
    // console.log('groupPPPP HERE', group);


    if (!singleGroup || !singleGroup.group || !singleGroup.group.members) {
        return <div>Loading...</div>;
    }

    const userId = user.id;
    const isOwner = userId === singleGroup.group.owner_id;
    const isMember = singleGroup.group.members.includes(user.username);

    // const isActivityOwner = userId === Object.values(singleGroup.group.activities).map(a => (a.owner_id))
    // console.log('HEREEEEE---------', isActivityOwner);

    // console.log('userId:', userId);
    // console.log('singleGroup.owner_id:', singleGroup.group.owner_id);
    // console.log('isOwner:HEREEEE', isOwner);
    // console.log('isMember:----->', isMember);

    if (!isOwner && !isMember) {
        return <div>You don't have permission to view this group.</div>;
    }


    return (
        <>
            <div className="individiual-group-container">
                {Object.keys(singleGroup).length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    <div className="group-container">

                        <div className="group-header">
                            <div className="group-name">
                                <div className="group-image">
                                    <img src={singleGroup.group.group_image} alt="Group Image" />
                                </div>


                                <div className="group-header-description-header">

                                    <div className="group-name">
                                        <h1>
                                            {singleGroup.group.group_name}
                                        </h1>
                                        <h2 className="note-description">{singleGroup.group.group_description}</h2>
                                        <div className="group-manage-modal-owner">
                                            {isOwner && (
                                                <OpenModalButton
                                                    modalComponent={<GroupManage singleGroup={singleGroup} />}
                                                    buttonText="&#x2699; Settings"
                                                    className={"server-emoji-button"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="members-section">

                            <div className="add-member">
                                <h2>Members</h2>


                            </div>

                            <div className="members">

                                {singleGroup.group.members.map((member) => (
                                    <div className="edit-member" key={member.id}>
                                        <div className="member">
                                            {/* {console.log('MemberHEREEEE:', Object.values(users))}
                                            {console.log('Member IDDDD:', member)} */}


                                            {Object.values(users).map((user) => {
                                                if (user.username === member) {
                                                    return (
                                                        <div key={user.id} className="group-details-member-profile-pic">
                                                            <img src={user.profilePic} alt="User Profile" />
                                                            <p style={{ textTransform: 'capitalize' }}>{user.username}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}


                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="activities-section-group">

                            <h2>Activities</h2>
                            <div className="create-button">
                                <OpenModalButton
                                    buttonText="Add an Activity"
                                    modalComponent={<AddGroupActivityModal group={singleGroup && singleGroup.group && singleGroup.group} />}
                                />
                            </div>



                            <div className="group-activities-list">
                                {singleGroup.group.activities.map((activity, index) => (
                                    <div key={index} className="group-details-activity-card">
                                        {/* isActivityOwner */}
                                        {console.log('activity ActivityOwner', activity)}
                                        {console.log('activity index', index)}


                                        <div className="activity-image">
                                            <img src={activity.activity_image} alt="Group Image" />
                                        </div>

                                        <div className="activity-card-contents">
                                            <h3>{activity.activity_name}</h3>
                                            <p>{activity.activity_description}</p>
                                            {userId === activity.owner_id ? (
                                                <OpenModalButton
                                                    modalComponent={<ActivityManage id={activity.id} groupId={groupId} activity={activity} />}
                                                    buttonText="&#x2699; Settings"
                                                    className={"server-emoji-button"}
                                                />
                                            ) : null}



                                        </div>


                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                )}
            </div>
        </>
    );
};

export default GroupDetails;