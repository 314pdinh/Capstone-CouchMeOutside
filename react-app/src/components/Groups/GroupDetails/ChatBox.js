import React, { useState } from 'react';
import OpenModalButton from '../../OpenModalButton';
import CommentManage from "../../Comment/CommentManage/CommentManage";
import CreateCommentModal from "../../Comment/CreateComment/CreateComment";

const ChatBox = ({ singleGroup, userId, groupId, users }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <>
            {(singleGroup && singleGroup.group) && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        right: '20px',
                        width: '300px',
                        height: isCollapsed ? '40px' : '400px',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transition: 'height 0.3s ease',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 9999,
                    }}
                >
                    <div
                        id="chat-header"
                        style={{
                            backgroundColor: '#4267B2',
                            color: '#fff',
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                        onClick={toggleCollapse}
                    >
                        <span>Chat Box</span>
                        <span id="toggle-btn">-</span>
                    </div>
                    <div
                        id="chat-body"
                        style={{
                            overflowY: 'auto',
                            padding: '10px',
                            height: '80%',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <div className="comments-section-group">
                            <div className="create-button">
                                <OpenModalButton
                                    buttonText="Add Comment"
                                    modalComponent={<CreateCommentModal group={singleGroup.group} />}
                                />
                            </div>
                            <div className="group-comments-list">
                                {singleGroup.group.comments.map((comment, index) => (
                                    <div key={index} className="group-details-comment-card" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px', padding: '8px' }}>
                                        <div className="comment-card-contents" style={{ display: 'flex', alignItems: 'center' }}>
                                            {comment.user_id && users[comment.user_id] && (
                                                <div className="group-details-member-profile-pic" style={{ marginRight: '10px' }}>
                                                    <img
                                                        src={users[comment.user_id].profilePic}
                                                        alt="User Profile"
                                                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                                    />
                                                    {/* <p style={{ textTransform: 'capitalize' }}>{users[comment.user_id].username}</p> */}

                                                </div>
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <p>{comment.text}</p>
                                                <div className="manage-modal-owner">
                                                    {userId === comment.user_id && (
                                                        <OpenModalButton
                                                            modalComponent={<CommentManage commentId={comment.id} groupId={groupId} comment={comment} />}
                                                            buttonText="&#x2699; Settings"
                                                            className={"server-emoji-button"}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default ChatBox;
