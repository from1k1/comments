import { combineReducers } from 'redux';
import { commentReducer } from './comments';
import { authReducer } from './auth';
import { userReducer } from './user';
import { userList } from './userlist';
import { userinfo } from './userinfo';
export const comboReducers = combineReducers({
    comments: commentReducer,//First Reducer
    auth: authReducer,
    user: userReducer,
    userlist: userList,
    userinfo: userinfo //Another one
});