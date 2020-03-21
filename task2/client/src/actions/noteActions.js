import axios from "axios";

import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CHANGE_NOTE_STATE,
  CHANGE_NOTE_TEXT,
  NOTES_LOADING
} from "./types";

export const getNotes = () => dispatch => {
  dispatch(setNotesLoading());
  axios
    .get("/profile/notes")
    .then(res =>
      dispatch({
        type: GET_NOTES,
        payload: res.data.notes
      })
    )
    .catch(err => {
      console.log(err.message);
    });
};

export const deleteNote = id => dispatch => {
  axios.delete(`/profile/delete-note/${id}`).then(res =>
    dispatch({
      type: DELETE_NOTE,
      payload: id
    })
  );
};

export const addNote = note => dispatch => {
  axios.post("/profile/add-note", { note: note }).then(res =>
    dispatch({
      type: ADD_NOTE,
      payload: res.data.note
    })
  );
};

export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING
  };
};
