import { FETCH_COMMENTS, SAVE_COMMENT, CHANGE_AUTH } from './types';
import axios from 'axios';
interface IResponse {
    comment: Array<string>,
    name: string
}
export class _saveComment {
    readonly type = SAVE_COMMENT
    public payload: string
    constructor(payload: string) {
        this.payload = payload
    }
}
/*
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const ans: Array<IResponse> = response.data;
    return {
        type: FETCH_COMMENTS,
        payload: ans.slice(1, 20).map(comment => comment.name)
    }
*/
export class _fetchComments {
    readonly type = FETCH_COMMENTS
    public payload: Array<string> | Promise<string[]>
    async getData(): Promise<Array<IResponse>> {
        const r = await axios.get('https://jsonplaceholder.typicode.com/comments');
        return r.data;
    }
    constructor() {
        const data = this.getData().then(value => {
            return value.slice(1,40).map(comment=>comment.name);
        });
        this.payload = data.then();
    }
}
export class _changeAuth {
    readonly type = CHANGE_AUTH
    public payload: boolean
    constructor(payload: boolean) {
        this.payload = payload;
    }
}
export const changeAuth = (isLoggedIn: boolean) => { const { type, payload } = new _changeAuth(isLoggedIn); return { type, payload } };
export const saveComment = (comment: string) => { const { type, payload } = new _saveComment(comment); return { type, payload } };
export const fetchComments = () => { const { type, payload } = new _fetchComments(); return { type, payload } };
export type ActionTypes = _saveComment | _fetchComments | _changeAuth;