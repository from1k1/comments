import { combineReducers } from 'redux';
import { commentReducer } from './comments';
import { authReducer } from './auth';
import { userReducer } from './user';
import { userList } from './userlist';
import { userinfo } from './userinfo';
import { messagesReducer } from './messages';
export const comboReducers = combineReducers({
    comments: commentReducer,//First Reducer
    auth: authReducer,
    user: userReducer,
    userlist: userList,
    userinfo: userinfo,
    messages: messagesReducer //Another one
});