
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleGroupThunk } from "../../../store/group";
import OpenModalButton from '../../OpenModalButton';
import GroupManage from "../GroupManage/GroupManage";
import { getAllUsersThunk } from '../../../store/user';

import './GroupDetails.css';



const defaultImage =
    "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";

const GroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();

    // const group = useSelector((state) => state.groups.allGroups.id);
    const singleGroup = useSelector((state) => state.groups.singleGroup);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(loadSingleGroupThunk(groupId));
    }, [dispatch, groupId]);

    const users = useSelector((state) => state.users.users);
    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    console.log('usersssss,----', users)

    console.log('groupID HEREEEE', groupId)
    console.log('ONE singleGroup:', singleGroup);
    console.log('USER HERE:', user);
    // console.log('groupPPPP HERE', group);


    if (!singleGroup || !singleGroup.group || !singleGroup.group.members) {
        return <div>Loading...</div>;
    }

    const userId = user.id;
    const isOwner = userId === singleGroup.group.owner_id;
    const isMember = singleGroup.group.members.includes(user.username);


    console.log('userId:', userId);
    console.log('singleGroup.owner_id:', singleGroup.group.owner_id);
    console.log('isOwner:HEREEEE', isOwner);
    console.log('isMember:----->', isMember);

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

                        {/* <div className="delete-member">

                        {isOwner && (
                            <OpenModalButton
                                buttonText="Delete a Member"
                                modalComponent={
                                    <DeleteMemberModal group={singleGroup && singleGroup.group && singleGroup.group} users={users} />
                                }
                            />
                            )}
                        </div> */}

                        <div className="members">
                            {singleGroup.group.members.map((member) => (
                                <div className="edit-member" key={member.id}>
                                    <div className="member">
                                        {console.log('Member:', member)}
                                        {member}
                                        {user &&
                                            user.id === singleGroup.group.owner_id &&
                                            user.username !== member && (
                                                <div className="remove-member">

                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>


                        
                        <h2>Activities</h2>


                        {singleGroup.group.activities.map((activity, index) => (
                            <div key={index}>
                                <div className="activity-image">
                                    <img src={activity.activity_image} alt="Group Image" />
                                </div>
                                <p>Activity Name: {activity.activity_name}</p>
                                <p>Activity Description: {activity.activity_description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GroupDetails;