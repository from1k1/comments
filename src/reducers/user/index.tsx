import { GET_USER_LIST,SAVE_USER_LIST } from '../../actions/types';
export const userReducer = (state: any = [], action:any) => {
    switch (action.type) {
        case SAVE_USER_LIST:
            return [...state,...action.payload]
        case GET_USER_LIST:
            console.log(...action.payload);
            return [...action.payload]
        default:
            return state;
    }
}