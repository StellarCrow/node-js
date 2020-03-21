import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CHANGE_NOTE_STATE,
  CHANGE_NOTE_TEXT
} from "./types";

export const getNotes = () => {
  return {
    type: GET_NOTES
  };
};

export const deleteNote = id => {
  return {
    type: DELETE_NOTE,
    payload: id
  };
};
