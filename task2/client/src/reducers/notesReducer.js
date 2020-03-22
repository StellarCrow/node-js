import {GET_NOTES, ADD_NOTE, DELETE_NOTE, CHANGE_NOTE_STATE, CHANGE_NOTE_TEXT} from '../actions/types';

const initialState = {
    notes: [
        {text: "lalala", id: "1"},
        {text: "bababaa", id: "2"}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NOTES:
            return {
                ...state
            }
        default: 
            return state;
    }
}