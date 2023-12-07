import React, { useState, useEffect } from "react";
import { useModal } from '../../../context/Modal'
import { addMemberThunk, loadAllGroupsThunk, loadSingleGroupThunk, deleteMemberThunk } from "../../../store/group";
import { useDispatch, useSelector } from "react-redux";

function DeleteMemberModal({ group, member }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (group && group.id) {
      const deleteResult = await dispatch(deleteMemberThunk(group.id, member));
      if (deleteResult) {
        closeModal();
        dispatch(loadSingleGroupThunk(group.id));
      }
    }
  };


  return (
    <div className="mainContainer">
      <h1 className="deleteHeader">Confirm Delete</h1>
      <p className="deleteText">Are you sure you want to remove this member ?</p>

      <div className="YN">
        <button
          id="yes-member-delete"
          onClick={handleSubmit}
        >
          Yes (Remove Member)
        </button>
        <button
          id="no-member-delete"
          onClick={((e) => {
            closeModal();
            e.stopPropagation();
            //   history.push(`/groups/${group.id}`)
          })}
        >
          No (Keep Member)
        </button>
      </div>
    </div>
  )
}

export default DeleteMemberModal;