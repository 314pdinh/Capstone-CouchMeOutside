// action types -------------------------------------------------------
const LOAD_ALL_GROUPS = "journeyjournal/groups/LOAD_ALL_GROUPS";
const LOAD_SINGLE_GROUP = "journeyjournal/groups/LOAD_SINGLE_GROUP"

const LOAD_USER_GROUPS = "journeyjournal/groups/LOAD_USER_GROUPS";

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

    default:
      return state;
  }
};


export default groupsReducer;