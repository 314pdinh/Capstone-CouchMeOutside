// action types -------------------------------------------------------
const LOAD_GROUP_COMMENTS = "journeyactivity/comments/LOAD_GROUP_COMMENTS";
const CREATE_COMMENT = "journeyactivity/comments/CREATE_COMMENT";
const UPDATE_COMMENT = "journeyactivity/comments/UPDATE_COMMENT";
const DELETE_COMMENT = "journeyactivity/comments/DELETE_COMMENT";

// action creators ---------------------------------------------------
export const loadGroupCommentsAction = (comments) => {
  return {
    type: LOAD_GROUP_COMMENTS,
    comments,
  };
};

export const createCommentAction = (comment) => {
  return {
    type: CREATE_COMMENT,
    payload: comment,
  };
};

export const updateCommentAction = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment,
  };
};

export const deleteCommentAction = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

// thunk action creators ---------------------------
export const loadGroupCommentsThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${groupId}`);
  const data = await response.json();
  const normalizedData = {};
  Object.values(data.group_comments).forEach((comment) => {
    normalizedData[comment.id] = comment;
  });
  dispatch(loadGroupCommentsAction(normalizedData));
  return data;
};

export const createCommentThunk = (formData, groupId) => async () => {
  try {
    // console.log('createComment thunk starting')
    // console.log('this is the formdata creatingcomment', formData)
    // console.log('this is the groupIDD creatingCOMMENT:', groupId)

    const response = await fetch(`/api/comments/${groupId}/new`, {
      method: "POST",
      body: formData,
    });
    const commentData = await response.json();

    // console.log("createCommentThunk RESPONSE ", response)
    // console.log("createCommentThunk COMMENT date", commentData)

    if (response.ok) {
      // console.log('cr Comment Thunk success')
      return commentData;
    } else {
      // console.log('cr comment Thunk fial')
      return commentData.errors;
    }
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};

export const updateCommentThunk = (form) => async () => {
  const commentId = form.get('commentId');
  const response = await fetch(`/api/comments/${commentId}/update`, {
    method: "PUT",
    body: form,
  });
  const updatedComment = await response.json();
  if (response.ok) {
    return updatedComment;
  } else {
    return updatedComment;
  }
};

export const deleteCommentThunk = (commentId) => async () => {
  try {
    await fetch(`/api/comments/${commentId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

// reducer ----------------------------------------------------------
const initialState = { groupComments: {} };

const commentsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_GROUP_COMMENTS:
      return {
        ...state,
        groupComments: action.comments,
      };

    case CREATE_COMMENT:
      newState = { ...state };
      let newComment = action.payload;
      newState.groupComments[newComment.id] = newComment;
      return newState;

    case UPDATE_COMMENT:
      newState = {
        ...state,
        groupComments: {
          ...state.groupComments,
          [action.comment.id]: action.comment,
        },
      };
      return newState;

    case DELETE_COMMENT:
      newState = {
        ...state,
        groupComments: { ...state.groupComments },
      };
      delete newState.groupComments[action.commentId];
      return newState;

    default:
      return state;
  }
};

export default commentsReducer;
