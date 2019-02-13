import { FETCH_COMMENTS, SAVE_COMMENT, CHANGE_AUTH, GET_USER_LIST, SAVE_USER_LIST, GET_ACCESS_TOKEN, VERIFY_TOKEN, DELETE_ACCESS_TOKEN, GET_USER_INFO, RECEIVE_MESSAGE } from './types';
import axios from 'axios';
import { User } from '../models/user';
import * as qs from 'query-string';
interface IResponse {
    comment: Array<string>,
    name: string
}
interface IUser {
    login: string;
    password: string;
    profile_pic: string;
    id: number
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
        const r = await axios.get('http://localhost:1337/userlist');
        console.log(r);
        return r.data;
    }
    constructor() {
        const data = this.getUserList().then(val => val);
        this.payload = data.then();
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
    public payload: Promise<boolean> | boolean;
    async checkLoginWindowClose(window: Window) {
        return new Promise<any>((resolve, reject) => {
            const checkWindow = (loginWindow: Window) => {
                if (!loginWindow.closed) {
                    setTimeout(() => checkWindow(loginWindow), 100)
                    return
                }
                const redirectUrl = localStorage.getItem("RequestURL");
                localStorage.removeItem("RequestURL");
                if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
                    alert("Вы не авторизованы, внатуре!");
                    return
                }
                if (redirectUrl) {
                    const params = qs.parse(redirectUrl);
                    localStorage.setItem("UserID", params.id ? params.id.toString() : "");
                    localStorage.setItem("UserTOKEN", params.token ? params.token.toString() : "");
                    if (localStorage.getItem("UserTOKEN") === "nothing") {
                        alert("Вы не авторизованы, внатуре!");
                        return
                    }
                }
                resolve(true);
            }

            checkWindow(window)
        })
    }

    constructor() {
        const loginWindow = window.open('http://localhost:1337/', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

        if (loginWindow) {
            const realshit = async () => await this.checkLoginWindowClose(loginWindow).then(res => {
                const authToken = localStorage.getItem("UserTOKEN");
                if (authToken) {
                    return new _verifyToken().verify().then(result => result);
                } else {
                    return false
                }
            });
            this.payload = realshit().then(res => res);
        } else {
            this.payload = false;
        }
    }
}
class _verifyToken {
    readonly type = VERIFY_TOKEN;
    public payload: boolean | Promise<boolean>;
    public async verify() {
        const token = localStorage.getItem("UserTOKEN");
        if (token) {
            axios.defaults.headers['Authorization'] = token;
            const verified = await axios.get("http://localhost:1337/verify");
            if (verified.data.success === true) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    constructor() {
        this.payload = this.verify().then(result => result);
    }
}
class _deleteToken {
    readonly type = DELETE_ACCESS_TOKEN;
    public payload: boolean;
    constructor() {
        localStorage.clear();
        this.payload = false;

    }
}
class _getUserInfo {
    readonly type = GET_USER_INFO;
    public payload: IUser | Promise<IUser>;
    async getInfo() {
        const info = await axios.get('http://localhost:1337/me');
        return info.data;
    }
    constructor() {
        const data = this.getInfo().then(val => val);
        this.payload = data.then();
    }
}
class _receiveMessage {
    readonly type = RECEIVE_MESSAGE;
    public payload: string;
    constructor(message: string) {
        this.payload = message;
    }
}
export const changeAuth = (isLoggedIn: boolean) => new _changeAuth(isLoggedIn);
export const saveComment = (comment: string) => new _saveComment(comment);
export const fetchComments = () => new _fetchComments();
export const getUserList = () => new _getUserList();
export const saveUserList = (UserList: Array<User>) => new _saveUserList(UserList);
export const getAccessToken = () => Object.assign({}, new _getAccessToken());
export const verifyToken = () => new _verifyToken();
export const deleteToken = () => Object.assign({}, new _deleteToken());
export const getUserInfo = () => Object.assign({}, new _getUserInfo());
export const receiveMessage = (message: string) => Object.assign({}, new _receiveMessage(message));
export type ActionTypes =
    _deleteToken |
    _saveComment |
    _fetchComments |
    _changeAuth |
    _getUserList |
    _saveUserList |
    _getAccessToken |
    _verifyToken |
    _getUserInfo |
    _receiveMessage;