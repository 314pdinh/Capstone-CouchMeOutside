// action types -------------------------------------------------------
const LOAD_ALL_GROUPS = "journeyjournal/groups/LOAD_ALL_GROUPS";
const LOAD_SINGLE_GROUP = "journeyjournal/groups/LOAD_SINGLE_GROUP"

const LOAD_USER_GROUPS = "journeyjournal/groups/LOAD_USER_GROUPS";

const CREATE_GROUP = "journeyjournal/groups/CREATE_GROUP"
const DELETE_GROUP = "journeyjournal/groups/DELETE_GROUP"

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

export const deleteGroupAction = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId
  }
}

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
    console.log('this is the one group thunk data', groupData)
    dispatch(loadSingleGroupAction(groupData));
    console.log('this is the 2nd one group thunk data', groupData)

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
    console.log('groupsData', groupsData);
    dispatch(loadUserGroupsAction(groupsData));
    return groupsData;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const createGroupThunk = (formData) => async (dispatch) => {
  console.log(`this is the formdata ${formData}`)
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



export const deleteGroupThunk = (groupId) => async (dispatch) => {
  console.log('deleteGroupThunk startingggggg')
  console.log('deleteGroupThunk ID', groupId)


  const res = await fetch(`/api/groups/${groupId}/delete`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (res.ok) {
    console.log('deleteGroupThunk success')
    dispatch(deleteGroupAction(groupId))
  } else {
    const errors = await res.json();
    return errors;
  }
}

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


    case DELETE_GROUP:
      newState = {
        ...state,
        singleGroup: {
          ...state.allGroups,
        }
      };
      delete newState.allGroups[action.group];
      return newState;

    default:
      return state;
  }
};


export default groupsReducer;