import { FETCH_COMMENTS, SAVE_COMMENT, CHANGE_AUTH, GET_USER_LIST, SAVE_USER_LIST, GET_ACCESS_TOKEN, VERIFY_TOKEN, DELETE_ACCESS_TOKEN } from './types';
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
        console.log(JSON.stringify(r.data.data));
        return r.data.data;
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
    public payload: Promise<boolean> | boolean;
    async checkLoginWindowClose(window: Window) {
        return new Promise<any>((resolve, reject) => {
            const checkWindow = (loginWindow: Window) => {
                if (!loginWindow.closed) {
                    setTimeout(() => checkWindow(loginWindow), 100)
                    return
                }
                const redirectUrl = localStorage.getItem("RequestURL");
                if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
                    alert("Вы не авторизованы, внатуре!");
                    return
                }
                if (redirectUrl) {
                    const params = qs.parse(redirectUrl);
                    console.log(params);
                    localStorage.setItem("UserID", params.id ? params.id.toString() : "");
                    localStorage.setItem("UserTOKEN", params.token ? params.token.toString() : "");
                }
                resolve(true);
            }

            checkWindow(window)
        })
    }
    /*if(!window.closed) {
        await setTimeout(() => this.checkLoginWindowClose(window), 100)
        console.log("window check");
        return;
    } else {
    console.log("WINDOW CLOSED");
    const redirectUrl = localStorage.getItem("RequestURL");
    if (redirectUrl) {
        const params = qs.parse(redirectUrl);
        console.log(params);
        localStorage.setItem("UserID", params.id ? params.id.toString() : "");
        localStorage.setItem("UserTOKEN", params.token ? params.token.toString() : "");
    }
    return true;*/

    constructor() {
        const loginWindow = window.open('https://node.black-d.ga/', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

        if (loginWindow) {
            const realshit = async () => await this.checkLoginWindowClose(loginWindow).then(res => {
                console.log("Окно закрылось тупа, ненавижу асинхронщину (обожаю)");
                const authToken = localStorage.getItem("UserTOKEN");
                if (authToken) {
                    return new _verifyToken().verify().then(result => result);
                } else {
                    return false
                }
            });
            this.payload = realshit().then(res => res);
        } else {
            console.log("Че мы тут делаем?");
            this.payload = false;
        }
    }
}
class _verifyToken {
    readonly type = VERIFY_TOKEN;
    public payload: boolean | Promise<boolean>;
    public async verify() {
        console.log("Че занах?");
        const token = localStorage.getItem("UserTOKEN");
        if (token) {
            axios.defaults.headers['Authorization'] = token;
            console.log(axios.defaults.headers['Authorization']);
            const verified = await axios.get("https://node.black-d.ga/verify");
            console.log("verified ili che? : ", verified);
            if (verified.data.success === true) {
                console.log("Token real good");
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    constructor() {
        this.payload = this.verify();
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
export const changeAuth = (isLoggedIn: boolean) => new _changeAuth(isLoggedIn);
export const saveComment = (comment: string) => new _saveComment(comment);
export const fetchComments = () => new _fetchComments();
export const getUserList = () => new _getUserList();
export const saveUserList = (UserList: Array<User>) => new _saveUserList(UserList);
export const getAccessToken = () => Object.assign({}, new _getAccessToken());
export const verifyToken = () => new _verifyToken();
export const deleteToken = () => Object.assign({}, new _deleteToken());
export type ActionTypes =
    _deleteToken |
    _saveComment |
    _fetchComments |
    _changeAuth |
    _getUserList |
    _saveUserList |
    _getAccessToken |
    _verifyToken;