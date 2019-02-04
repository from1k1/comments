import { GET_USER_LIST,SAVE_USER_LIST, GET_ACCESS_TOKEN } from '../../actions/types';
export const userReducer = (state: any = [], action:any) => {
    switch (action.type) {
        case SAVE_USER_LIST:
            return [...state,...action.payload]
        case GET_USER_LIST:
            console.log("REUDCER LOG: " , ...action.payload);
            return [...action.payload]
        case GET_ACCESS_TOKEN:
            console.log("REDUCER LOG ACCESS TOKEN",action.payload)
            return [...state,action.payload]
        default:
            return state;
    }
}