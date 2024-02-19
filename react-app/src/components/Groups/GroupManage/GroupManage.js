import OpenModalButton from "../../OpenModalButton";
import GroupUpdateModal from '../UpdateGroupModal/UpdateGroupModal';
import DeleteGroupModal from "../DeleteGroupModal/DeleteGroupModal";
import './GroupManage.css';

const GroupManage = ({ singleGroup }) => {
    // console.log('GROUPMANAGEEEEE ID', singleGroup)
    return (
        <div className="manage-container-group">
            <h1 className="manage-header-group">Manage {singleGroup.group.group_name} group</h1>
            <div className="manage-buttons-format">
                <div className="update-button">
                    <OpenModalButton className="group-button" id='update-group' buttonText='Update Group' modalComponent={<GroupUpdateModal title='Update Group' singleGroup={singleGroup} />} />
                </div>

                <div className="delete-button">
                    <OpenModalButton className="group-button" id="delete-group" buttonText='Delete Group' modalComponent={<DeleteGroupModal type="group" id={singleGroup.group.id} />} />
                </div>
            </div>
        </div>
    )
}

export default GroupManage