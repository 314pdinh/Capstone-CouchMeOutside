// action types -------------------------------------------------------
const LOAD_ALL_JOURNALS = "journeyjournal/journals/LOAD_ALL_JOURNALS";
const LOAD_SINGLE_JOURNAL = "journeyjournal/journals/LOAD_SINGLE_JOURNAL"
const UPDATE_JOURNAL = "journeyjournal/journals/UPDATE_JOURNAL"
const CREATE_JOURNAL = "journeyjournal/journals/CREATE_JOURNAL"
const DELETE_JOURNAL = "journeyjournal/journals/DELETE_JOURNAL"
const LOAD_USER_JOURNALS = "journeyjournal/journals/LOAD_USER_JOURNALS";
// action creators ---------------------------------------------------

export const loadAllJournalsAction = (journals) => {
  return {
    type: LOAD_ALL_JOURNALS,
    journals,
  };
};

export const loadSingleJournalAction = (journal) => {
  return {
    type: LOAD_SINGLE_JOURNAL,
    journal
  }
}

export const updateJournalAction = (journal) => {
  return {
    type: UPDATE_JOURNAL,
    journal
  }
}

export const createJournalAction = (journal) => {
  return {
    type: CREATE_JOURNAL,
    payload: journal
  }
}

export const deleteJournalAction = (journalId) => {
  return {
    type: DELETE_JOURNAL,
    journalId
  }
}

export const loadUserJournalsAction = (journals) => {
  return {
    type: LOAD_USER_JOURNALS,
    journals,
  };
};


// thunk action creators ---------------------------

export const loadAllJournalsThunk = () => async (dispatch) => {
  const res = await fetch("/api/journals/all", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllJournalsAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const loadSingleJournalThunk = (journalId) => async (dispatch) => {
  const res = await fetch(`/api/journals/${journalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (res.ok) {
    const journalData = await res.json();
    dispatch(loadSingleJournalAction(journalData));
    return journalData
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const updateJournalThunk = (form) => async (dispatch) => {
  console.log('Form data ---- updateJournalThunk:', form);
  try {
    const res = await fetch(`/api/journals/${form.get('id')}`, {
      method: "PUT",
      body: form,
    });
    const updatedJournal = await res.json();
    if (res.ok) {
      dispatch(updateJournalAction(updatedJournal));
      return updatedJournal;
    } else {
      return updatedJournal
    }
  } catch (error) {
    console.error("Error in createJournalThunk:", error);
    return { errors: ["An unexpected error occurred."] };
  }
}

export const createJournalThunk = (formData) => async (dispatch) => {
  console.log(`this is the formdata ${formData}`)
  try {
    const res = await fetch("/api/journals/create", {
      method: "POST",
      body: formData
    })

    const journalData = await res.json();

    if (res.ok) {
      dispatch(createJournalAction(journalData));
      return journalData;
    } else {
      // return journalData.errors
      return { errors: journalData }
    }
  } catch (error) {
    console.error("Error in createJournalThunk:", error);
    return { errors: ["An unexpected error occurred."] };
  }
}

export const deleteJournalThunk = (journalId) => async (dispatch) => {
  const res = await fetch(`/api/journals/${journalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (res.ok) {
    dispatch(deleteJournalAction(journalId))
  } else {
    const errors = await res.json();
    return errors;
  }
}

// export const loadUserJournalsThunk = () => async (dispatch) => {
//   try {
//     const res = await fetch("/api/journals/current");

//     if (res.ok) {
//       const journalsData = await res.json();
//       dispatch(loadUserJournalsAction(journalsData));
//       return journalsData;
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   } catch (error) {
//     console.error("An error occurred while loading user journals:", error);
//   }
// };


export const loadUserJournalsThunk = () => async (dispatch) => {
  try {
    const res = await fetch("/api/journals/current");

    const data = await res.json();
    console.log('this is the data, ', data)
    const normalizedData = {};
    Object.values(data).forEach((journal) => {
      normalizedData[journal.id] = journal;
    });
    dispatch(loadUserJournalsAction(normalizedData));
    return data;

  } catch (error) {
    console.error("An error occurred while loading user journals:", error);
  }
};

// reducer----------------------------------------------------------------------------------------------------------
const initialState = { allJournals: [], singleJournal: {} };
// --------------------------------------------------------------------------------------------------------
const journalsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LOAD_ALL_JOURNALS:
      newState = { ...state, allJournals: {} };
      action.journals.forEach(
        (journal) => (newState.allJournals[journal.id] = journal)
      );
      return newState;
    case LOAD_SINGLE_JOURNAL:
      newState = { ...state, singleJournal: {} }
      newState.singleJournal = { ...action.journal }
      return {
        ...state,
        singleJournal: action.journal
      }
    case CREATE_JOURNAL:
      newState = { ...state };
      let newJournal = action.payload;

      newState.allJournals[newJournal.id] = newJournal;
      newState.singleJournal = newJournal;
      return newState;
    case UPDATE_JOURNAL:
      newState = {
        ...state,
        allJournals: {
          ...state.allJournals,
          [action.journal.id]: action.journal,
        },
      };
      return newState;
    case DELETE_JOURNAL:
      newState = {
        ...state,
        singleJournal: {
          ...state.allJournals
        }
      };
      delete newState.allJournals[action.journal];
      return newState;
    // case LOAD_USER_JOURNALS:
    //   console.log("Action received in LOAD_USER_JOURNALS reducer:", action);

    //   newState = { ...state, userJournals: {} };
    //   action.journals.forEach(
    //     (journal) => (newState.userJournals[journal.id] = journal)
    //   );

    //   console.log("New state after processing action:", newState);

    //   return newState;

    case LOAD_USER_JOURNALS:
      return {
        ...state,
        allJournals: action.journals,
      };
    default:
      return state;
  }
};

export default journalsReducer;