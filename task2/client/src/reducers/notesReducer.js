import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  CHANGE_NOTE_STATE,
  CHANGE_NOTE_TEXT,
  NOTES_LOADING
} from "../actions/types";

const initialState = {
  notes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };
    case NOTES_LOADING:
      return {
        ...state,
        loading: true
      };
    case CHANGE_NOTE_TEXT:
    case CHANGE_NOTE_STATE:
      return {
        ...state
      }
    default:
      return state;
  }
}
