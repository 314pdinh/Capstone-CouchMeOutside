// action types -------------------------------------------------------
const LOAD_ALL_ACTIVITIES = "journeyactivity/activities/LOAD_ALL_ACTIVITIES";
const LOAD_SINGLE_ACTIVITY = "journeyactivity/activities/LOAD_SINGLE_ACTIVITY"
const UPDATE_ACTIVITY = "journeyactivity/activities/UPDATE_ACTIVITY"
const CREATE_ACTIVITY = "journeyactivity/activities/CREATE_ACTIVITY"
const DELETE_ACTIVITY = "journeyactivity/activities/DELETE_ACTIVITY"
const LOAD_USER_ACTIVITIES = "journeyactivity/activities/LOAD_USER_ACTIVITIES";
const LOAD_GROUP_ACTIVITIES = "journeyactivity/activities/LOAD_GROUP_ACTIVITIES"
// action creators ---------------------------------------------------

export const loadAllActivitiesAction = (activities) => {
  return {
    type: LOAD_ALL_ACTIVITIES,
    activities,
  };
};

export const loadSingleActivityAction = (activity) => {
  return {
    type: LOAD_SINGLE_ACTIVITY,
    activity
  }
}

export const updateActivityAction = (activity) => {
  return {
    type: UPDATE_ACTIVITY,
    activity
  }
}

export const createActivityAction = (activity) => {
  return {
    type: CREATE_ACTIVITY,
    payload: activity
  }
}

export const deleteActivityAction = (activityId) => {
  return {
    type: DELETE_ACTIVITY,
    activityId
  }
}

export const loadUserActivitiesAction = (activities) => {
  return {
    type: LOAD_USER_ACTIVITIES,
    activities,
  };
};

const loadGroupActivitiesAction = (group) => {
  return {
    type: LOAD_GROUP_ACTIVITIES,
    group,
  };
};

// thunk action creators ---------------------------

export const loadGroupActivitiesThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/activities/${groupId}`);

  const data = await response.json();

  const normalizedData = {};
  Object.values(data.group_activities).forEach((activity) => {
    normalizedData[activity.id] = activity;
  });

  dispatch(loadGroupActivitiesAction(normalizedData));
  return data;
};

export const loadAllActivitiesThunk = () => async () => {
  const res = await fetch("/api/activities/all", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const loadSingleActivityThunk = (activityId) => async () => {
  const res = await fetch(`/api/activities/${activityId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (res.ok) {
    const activityData = await res.json();
    return activityData
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const updateActivityThunk = (form) => async () => {
  console.log('Form data ---- updateActivityThunk:', form);
  const activityId = form.get('activityId')
  console.log('activityId from update activity thunk', activityId)
  const res = await fetch(`/api/activities/${form.get('activityId')}/update`, {
    method: "PUT",
    body: form,
  });
  const updatedActivity = await res.json();
  if (res.ok) {
    return updatedActivity;
  } else {
    return updatedActivity
  }
}

export const createActivityThunk = (formData, groupId) => async () => {
  try {
    console.log('createActivity thunk starting')
    console.log('this is the formdata creatingActivity', formData)
    console.log('this is the groupIDD creatingActivity:', groupId)

    const response = await fetch(`/api/activities/${groupId}/new`, {
      method: "POST",
      body: formData
    })

    const activityData = await response.json();

    console.log("createactivityThunk RESPONSE ", response)
    console.log("createactivityThunk ACTIVITY date", activityData)

    if (response.ok) {
      console.log('createActivity Thunk success')
      return activityData;
    } else {
      console.log('createActivity Thunk fial')
      return activityData.errors
    }
  } catch (error) {
    console.error('Error creating activity:', error);
  }
}

export const deleteActivityThunk = (activityId) => async () => {
  try {
    console.log('delete activity Thunk actId', activityId)
    console.log('deletingActivity thunk starting')

    const res = await fetch(`/api/activities/${activityId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      console.log('sucessful delete activity thunk')
    } else {
      const errors = await res.json();
      return errors;
    }
  } catch (error) {
    console.error('Error --------- deleteActivityThunk:', error);
  }
}

// export const loadUserActivitiesThunk = () => async () => {
//   try {
//     const res = await fetch("/api/activities/current");

//     if (res.ok) {
//       const activitiesData = await res.json();
//       return activitiesData;
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   } catch (error) {
//     console.error("An error occurred while loading user Activities:", error);
//   }
// };


export const loadUserActivitiesThunk = () => async (dispatch) => {
  try {
    const res = await fetch("/api/activities/current");

    const data = await res.json();
    console.log('this is the data, ', data)
    const normalizedData = {};
    Object.values(data).forEach((activity) => {
      normalizedData[activity.id] = activity;
    });
    dispatch(loadUserActivitiesAction(normalizedData));
    return data;

  } catch (error) {
    console.error("An error occurred while loading user activities:", error);
  }
};

// reducer----------------------------------------------------------------------------------------------------------
const initialState = { allActivities: [], singleActivity: {}, groupActivities: {} };
// --------------------------------------------------------------------------------------------------------

const activitiesReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LOAD_GROUP_ACTIVITIES:
      return {
        ...state,
        groupActivities: action.group,
      };

    case LOAD_ALL_ACTIVITIES:
      newState = { ...state, allActivities: {} };
      action.activities.forEach(
        (activity) => (newState.allActivities[activity.id] = activity)
      );
      return newState;

    case LOAD_SINGLE_ACTIVITY:
      newState = { ...state, singleActivity: {} }
      newState.singleActivity = { ...action.activity }
      return {
        ...state,
        singleActivity: action.activity
      }

    case CREATE_ACTIVITY:
      newState = { ...state };
      let newActivity = action.payload;

      newState.allActivities[newActivity.id] = newActivity;
      newState.singleActivity = newActivity;
      return newState;

    case UPDATE_ACTIVITY:
      newState = {
        ...state,
        allActivities: {
          ...state.allActivities,
          [action.activity.id]: action.activity,
        },
      };
      return newState;

    case DELETE_ACTIVITY:
      newState = {
        ...state,
        singleActivity: {
          ...state.allActivities
        }
      };
      delete newState.allActivities[action.activity];
      return newState;

    case LOAD_USER_ACTIVITIES:
      return {
        ...state,
        allActivities: action.activities,
      };
    default:
      return state;
  }
};

export default activitiesReducer;