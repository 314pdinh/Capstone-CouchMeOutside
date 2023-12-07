import React, { useState, useEffect } from "react";
import { useModal } from '../../../context/Modal'
import { addMemberThunk, loadAllGroupsThunk, loadSingleGroupThunk } from "../../../store/group";
import { useDispatch, useSelector } from "react-redux";
import './AddMemberModal.css';

function AddMemberModal({ group, users }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")
    const [userName, setUserName] = useState("");
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const groupMembers = group && group.members;

    console.log('this is the GROUPP', group)
    console.log('this is the groupmemners', groupMembers)

    const handleSearchChange = (e) => {
        const searchlowcase = e.target.value.toLowerCase();
        setSearch(searchlowcase);
    };

    useEffect(() => {
        const errorsObject = {};
        if (!userName) {
            errorsObject.userName = "User must be selected";
        }
        if (groupMembers && groupMembers.includes(userName)) {
            errorsObject.userName = "User is in this group";
        }
        setError(errorsObject);
    }, [groupMembers, userName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (Object.values(error).length) {
            return null;
        }

        setError({});
        if (group && group.id) {
            console.log('Group ID before dispatch:', group.id);
            await dispatch(addMemberThunk(group.id, userName));
            closeModal();
            dispatch(loadSingleGroupThunk(group.id));

        }
    };

    const usersMatch = Object.values(users).filter((user) =>
        user.username.toLowerCase().includes(search)
    );

    return (
        <div className="mainContainer">
            <form onSubmit={handleSubmit}>
                <div className="add-member-header">Search for a user to add to group</div>
                <div className="add-member-input">
                    <input
                        className="add-member-input"
                        placeholder="Search for a user"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {search.length > 0 &&
                        usersMatch.length > 0 &&
                        usersMatch.map((user) => (
                            <div className={userName === user.username ? "highlighted user" : "user"} onClick={() => setUserName(user.username)} key={user.id}>
                                {user.username}
                            </div>
                        ))}
                    {search.length > 0 && usersMatch.length === 0 && (
                        <div>No users found, please try again</div>
                    )}
                    {submitted && error.userName && (
                        <p className="error">{error.userName}</p>
                    )}
                </div>
                <div className="create-button">
                <button type="submit">Add member to group</button>
                </div>
            </form>
        </div>
    );
}

export default AddMemberModal;