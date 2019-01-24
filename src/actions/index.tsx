import { FETCH_COMMENTS, SAVE_COMMENT,CHANGE_AUTH } from './types';
import axios from 'axios';
interface IResponse{
    comment:Array<string>,
    name:string
}
export const saveComment = (comment: string) => {
    return {
        type:SAVE_COMMENT,
        payload:comment
    }
}
export const fetchComments = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const ans:Array<IResponse> = response.data;
    return {
        type:FETCH_COMMENTS,
        payload: ans.slice(1,20).map(comment => comment.name)
    }
}
export const changeAuth = (isLoggedIn:boolean) => {
    return{
        type:CHANGE_AUTH,
        payload:isLoggedIn
    }
}