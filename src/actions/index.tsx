import { FETCH_COMMENTS, SAVE_COMMENT, CHANGE_AUTH, GET_USER_LIST, SAVE_USER_LIST, GET_ACCESS_TOKEN } from './types';
import axios from 'axios';
import { User } from '../models/user';
import * as qs from 'query-string';
interface IResponse {
    comment: Array<string>,
    name: string
}
class _saveComment {
    readonly type = SAVE_COMMENT
    public payload: string
    constructor(payload: string) {
        this.payload = payload
    }
}

class _fetchComments {
    readonly type = FETCH_COMMENTS
    public payload: Array<string> | Promise<Array<string>>
    async getData(): Promise<Array<IResponse>> {
        const r = await axios.get('https://jsonplaceholder.typicode.com/comments');
        return r.data;
    }
    constructor() {
        const data = this.getData().then(value => {
            return value.slice(1, 40).map(comment => comment.name);
        });
        this.payload = data.then();
        console.log(this.payload);
    }
}

class _changeAuth {
    readonly type = CHANGE_AUTH
    public payload: boolean
    constructor(payload: boolean) {
        localStorage.setItem('auth', '' + payload);
        this.payload = payload;
    }
}
class _getUserList {
    readonly type = GET_USER_LIST;
    public payload: Array<User> | Promise<Array<User>>;
    async getUserList(): Promise<Array<User>> {
        const r = await axios.get('https://node.black-d.ga/userlist');
        return r.data;
    }
    constructor() {
        const data = this.getUserList().then(val => val);
        this.payload = data.then();
        console.log(this.payload);
    }
}
class _saveUserList {
    readonly type = SAVE_USER_LIST;
    public payload: Array<User> | Promise<Array<User>>;
    constructor(UserList: Array<User>) {
        this.payload = UserList;
    }
}
class _getAccessToken {
    readonly type = GET_ACCESS_TOKEN;
    public payload: boolean;
    async checkLoginWindowClose(window: Window) {
        console.log("CHECKING WINDOWS");
        if (!window.closed) {
            setTimeout(() => this.checkLoginWindowClose(window), 100)
            return
        } else {
            const redirectUrl = localStorage.getItem("RequestURL");
            if (redirectUrl) {
                const params = qs.parse(redirectUrl);
                console.log(params);
                localStorage.setItem("UserID", params.id ? params.id.toString() : "");
                localStorage.setItem("UserTOKEN", params.token ? params.token.toString() : "");

            }
        }
    }
    constructor() {
        if (localStorage.getItem("access_token") === undefined || 1 === 1) {
            console.log("TEST1");
            const loginWindow = window.open('https://node.black-d.ga/signup', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

            if (loginWindow) {
                this.checkLoginWindowClose(loginWindow);
                this.payload = true;
            } else {
                this.payload = false;
            }
        } else {
            this.payload = false;
        }
        console.log(this.payload);
    }
}
export const changeAuth = (isLoggedIn: boolean) => { const { type, payload } = new _changeAuth(isLoggedIn); return { type, payload } };
export const saveComment = (comment: string) => { const { type, payload } = new _saveComment(comment); return { type, payload } };
export const fetchComments = () => { const { type, payload } = new _fetchComments(); return { type, payload } };
export const getUserList = () => { const { type, payload } = new _getUserList(); return { type, payload } };
export const saveUserList = (UserList: Array<User>) => { const { type, payload } = new _saveUserList(UserList); return { type, payload } };
export const getAccessToken = () => { const { type, payload } = new _getAccessToken(); return { type, payload } };
export type ActionTypes = _saveComment | _fetchComments | _changeAuth | _getUserList | _saveUserList | _getAccessToken;