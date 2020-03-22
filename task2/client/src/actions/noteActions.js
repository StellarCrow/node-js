import axios from "axios";
import  { tokenConfig } from "./authActions";

import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CHANGE_NOTE_STATE,
  CHANGE_NOTE_TEXT,
  NOTES_LOADING
} from "./types";

export const getNotes = () => (dispatch, getState) => {
  dispatch(setNotesLoading());
  axios
    .get("/api/profile/notes", tokenConfig(getState))
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

export const deleteNote = id => (dispatch, getState) => {
  axios.delete(`/api/profile/delete-note/${id}`, tokenConfig(getState)).then(res =>
    dispatch({
      type: DELETE_NOTE,
      payload: id
    })
  );
};

export const addNote = note => (dispatch, getState) => {
  axios.post("/api/profile/add-note", { note: note }, tokenConfig(getState)).then(res =>
    dispatch({
      type: ADD_NOTE,
      payload: res.data.note
    })
  );
};

export const changeNoteText = (id, text) => (dispatch, getState) => {
  axios.put("/api/note/modify", {note: id, text: text}, tokenConfig(getState))
  .then(res => dispatch({
    type: CHANGE_NOTE_TEXT,
    payload: res.data.note
  })).catch (err => {
    console.log(err.response);
  })
}

export const changeNoteChecked = (id, checked) => (dispatch, getState) => {
  axios.post("/api/note/check", {note: id, checked: checked}, tokenConfig(getState))
  .then(res => dispatch({
    type: CHANGE_NOTE_STATE,
    payload: res.data.note
  })).catch (err => {
    console.log(err.response);
  })
}


export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING
  };
};
