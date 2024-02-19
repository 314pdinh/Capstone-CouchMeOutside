// action types -------------------------------------------------------
const LOAD_ALL_GROUPS = "journeyjournal/groups/LOAD_ALL_GROUPS";
const LOAD_SINGLE_GROUP = "journeyjournal/groups/LOAD_SINGLE_GROUP"

const LOAD_USER_GROUPS = "journeyjournal/groups/LOAD_USER_GROUPS";

const CREATE_GROUP = "journeyjournal/groups/CREATE_GROUP"
const UPDATE_GROUP = "journeyjournal/groups/UPDATE_GROUP"
const DELETE_GROUP = "journeyjournal/groups/DELETE_GROUP"

const ADD_MEMBER = "/group/members/ADD_MEMBER";
const DELETE_MEMBER = "/group/members/DELETE_MEMBER";
// action creators ---------------------------------------------------

export const loadAllGroupsAction = (groups) => {
  return {
    type: LOAD_ALL_GROUPS,
    groups,
  };
};


export const loadSingleGroupAction = (group) => {
  return {
    type: LOAD_SINGLE_GROUP,
    group
  }
}




export const loadUserGroupsAction = (groups) => {
  return {
    type: LOAD_USER_GROUPS,
    groups,
  };
};

export const createGroupAction = (group) => {
  return {
    type: CREATE_GROUP,
    payload: group
  }
}

export const updateGroupAction = (group) => {
  // console.log('GROUPPPPPP updateGroupAction:', group);
  return {
    type: UPDATE_GROUP,
    group
  }
}

export const deleteGroupAction = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId
  }
}

export const addMember = (groupMember) => {
  return {
    type: ADD_MEMBER,
    groupMember,
  };
};

export const deleteMember = (groupMember) => {
  return {
    type: DELETE_MEMBER,
    groupMember
  };
};

// thunk action creators ---------------------------

export const loadAllGroupsThunk = () => async (dispatch) => {
  const res = await fetch("/api/groups/all", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllGroupsAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const loadSingleGroupThunk = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`)
  if (res.ok) {
    const groupData = await res.json();
    // console.log('this is the one group thunk data', groupData)
    dispatch(loadSingleGroupAction(groupData));
    // console.log('this is the 2nd one group thunk data', groupData)

    return groupData
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const loadUserGroupsThunk = () => async (dispatch) => {
  const res = await fetch("/api/groups/current");

  if (res.ok) {
    const groupsData = await res.json();
    // console.log('groupsData', groupsData);
    dispatch(loadUserGroupsAction(groupsData));
    return groupsData;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const createGroupThunk = (formData) => async (dispatch) => {
  // console.log(`this is the formdata ${formData}`)
  const res = await fetch("/api/groups/create", {
    method: "POST",
    body: formData
  })

  const groupData = await res.json();

  if (res.ok) {
    dispatch(createGroupAction(groupData));
    return groupData;
  } else {
    return groupData.errors
  }
}

export const updateGroupThunk = (form) => async (dispatch) => {
  // console.log('Form data ---- updateGroupThunk:', form);
  const groupId = form.get('groupId');
  // console.log('Group ID in updateGroupThunk:', groupId);

  const res = await fetch(`/api/groups/${form.get('groupId')}/update`, {
    method: 'PUT',
    body: form,
  });
  const updatedGroup = await res.json();
  if (res.ok) {
    // console.log('this is the updated group thunk data beforehand', updatedGroup)
    dispatch(updateGroupAction(updatedGroup));
    // console.log('Updated Group ----- updateGroupThunk:', updatedGroup);
    return updatedGroup;
  } else {
    // console.error('Error updating group:', updatedGroup);
    return updatedGroup
  }
}

export const deleteGroupThunk = (groupId) => async (dispatch) => {
  // console.log('deleteGroupThunk startingggggg')
  // console.log('deleteGroupThunk ID', groupId)


  const res = await fetch(`/api/groups/${groupId}/delete`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (res.ok) {
    // console.log('deleteGroupThunk success')
    dispatch(deleteGroupAction(groupId))
  } else {
    const errors = await res.json();
    return errors;
  }
}


export const addMemberThunk = (groupId, username) => async (dispatch) => {
  try {
    // console.log('addingMember thunk starting')
    // console.log('groupID member thunk', groupId)
    // console.log('memberThunk userNAMEE', username)


    const response = await fetch(`/api/groups/${groupId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    // console.log("memberthunks ", response)
    if (response.ok) {
      // console.log("adding member success")
      const data = await response.json();

      // console.log("memberThunk", data)
 

    } else {
      const errorMessage = await response.text();
      // console.log("adding member fail")
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error adding member:", error);

  }
};

export const deleteMemberThunk = (groupId, username) => async (dispatch) => {

  // console.log('delete Member Thunk groupID', groupId)
  // console.log('delete Member Thunk USERNAME', username)
  // console.log('deletingMember thunk starting')


  const res = await fetch(`/api/groups/${groupId}/members`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });

  if (res.ok) {
    // console.log('sucessful delete member thunk')
    const data = await res.json();
    // console.log('sucessful delete member thunk DATAAA', data)
    return data;

  } else {
    const errors = await res.json();
    return errors;
  }
};

// reducer----------------------------------------------------------------------------------------------------------
const initialState = { allGroups: [], singleGroup: {}, groupMembers: {} };
// --------------------------------------------------------------------------------------------------------
const groupsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LOAD_ALL_GROUPS:
      newState = { ...state, allGroups: {} };
      action.groups.forEach((group) => (newState.allGroups[group.id] = group));
      return newState;

    case LOAD_SINGLE_GROUP:
      newState = { ...state, singleGroup: {} };
      newState.singleGroup = { ...action.group };
      return {
        ...state,
        singleGroup: action.group
      };

    case LOAD_USER_GROUPS:
      return {
        ...state,
        allGroups: action.groups,
      };


    case CREATE_GROUP:
      newState = { ...state };
      let newGroup = action.payload;
      newState.allGroups[newGroup.id] = newGroup;
      newState.singleGroup = newGroup;
      return newState;


    case UPDATE_GROUP:
      newState = {
        ...state,
        allGroups: {
          ...state.allGroups,
          [action.group.id]: action.group,
        },
      };

    case DELETE_GROUP:
      newState = {
        ...state,
        singleGroup: {
          ...state.allGroups,
        }
      };
      delete newState.allGroups[action.group];
      return newState;

    case ADD_MEMBER:
      return {
        ...state,
        groupMembers: action.groupMembers,
      };

    case DELETE_MEMBER:
      const newMemberState = {
        ...state,
        groupMembers: { ...state.groupMembers },
      };
      delete newMemberState.groupMembers[action.id];
      return newMemberState;

    default:
      return state;
  }
};


export default groupsReducer;