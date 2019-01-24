import { combineReducers } from 'redux';
import { commentReducer } from './comments';
import { authReducer } from './auth';
export const comboReducers = combineReducers({
    comments: commentReducer,//First Reducer
    auth: authReducer //Another one
});