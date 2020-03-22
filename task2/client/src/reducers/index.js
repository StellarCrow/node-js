import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import notesReducer from './notesReducer';

export default combineReducers({
    note: notesReducer,
    auth: authReducer,
    error: errorReducer
})