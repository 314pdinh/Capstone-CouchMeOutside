import OpenModalButton from "../../OpenModalButton";
import ActivityUpdateModal from "../UpdateActivityModal/UpdateActivityModal";
import DeleteActivityModal from "../DeleteActivityModal/DeleteActivityModal";
// import './GroupManage.css';

const ActivityManage = ({ id, groupId, activity }) => {
    // console.log('GROUPMANAGEEEEE ID', id)
    // console.log('GROUPMANAGEEEEE ID', groupId)

    return (
        <div className="manage-container-group">
            <h1 className="manage-header">Manage {activity.activity_name} activity</h1>
            <div className="manage-buttons-format">
                <div className="update-button">
                    <OpenModalButton className="activity-button" id='update' buttonText='Update Activity' modalComponent={<ActivityUpdateModal title='Update Activity' activity={activity} groupId={groupId} />} />
                </div>

                <div className="delete-button">

                    <OpenModalButton className="activity-button" id="delete" buttonText='Delete Activity' modalComponent={<DeleteActivityModal type="activity" id={id} groupId={groupId} />} />
                </div>
            </div>
        </div>

    )
}

export default ActivityManage;