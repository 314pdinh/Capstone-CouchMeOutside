import OpenModalButton from "../../OpenModalButton";
import ActivityUpdateModal from "../UpdateActivityModal/UpdateActivityModal";
import DeleteActivityModal from "../DeleteActivityModal/DeleteActivityModal";
// import './GroupManage.css';

const ActivityManage = ({ id, groupId, activity}) => {
    console.log('GROUPMANAGEEEEE ID', id)
    console.log('GROUPMANAGEEEEE ID', groupId)

    return (
        <div className="manage-container">
            <h1 className="manage-header">Manage activity</h1>
            <div>
            <OpenModalButton className="activity-button" id='update' buttonText='Update Activity' modalComponent={<ActivityUpdateModal title='Update Activity' activity={activity} groupId={groupId} />} />
            <OpenModalButton className="activity-button" id="delete" buttonText='Delete Activity'  modalComponent={<DeleteActivityModal type="activity" id={id} groupId={groupId} />} />
            </div>
        </div>
    )
}

export default ActivityManage;