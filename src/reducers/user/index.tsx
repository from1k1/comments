import { GET_USER_LIST,SAVE_USER_LIST, GET_ACCESS_TOKEN,VERIFY_TOKEN } from '../../actions/types';
export const userReducer = (state: any = [], action:any) => {
    switch (action.type) {
        case SAVE_USER_LIST:
            return [...state,...action.payload]
        case GET_USER_LIST:
            return [...action.payload]
        case GET_ACCESS_TOKEN:
            return [...state,action.payload]
        case VERIFY_TOKEN:
            console.log("FCKING STATE:" , [...state]);
            console.log("FCKING PAYLOAD:" , action.payload);
            return action.payload
        default:
            return state;
    }
}