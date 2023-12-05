import OpenModalButton from "../../OpenModalButton";
import GroupUpdateModal from '../UpdateGroupModal/UpdateGroupModal';
import DeleteGroupModal from "../DeleteGroupModal/DeleteGroupModal";
import './GroupManage.css';

const GroupManage = ({ singleGroup }) => {
    console.log('GROUPMANAGEEEEE ID', singleGroup)
    return (
        <div className="manage-container">
            <h1 className="manage-header">Manage {singleGroup.group_name}</h1>
            <h2>Manage Group</h2>
            <div>
            <OpenModalButton className="group-button" id='update' buttonText='Update Group' modalComponent={<GroupUpdateModal title='Update Group' singleGroup={singleGroup} />} />
            <OpenModalButton className="group-button" id="delete" buttonText='Delete Group'  modalComponent={<DeleteGroupModal type="group" id={singleGroup.group.id} />} />
            </div>
        </div>
    )
}

export default GroupManage