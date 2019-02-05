import { GET_ACCESS_TOKEN, VERIFY_TOKEN, DELETE_ACCESS_TOKEN } from '../../actions/types';
export const userReducer = (state: any = false, action: any) => {
    switch (action.type) {
        case DELETE_ACCESS_TOKEN : {
            return action.payload
        }
        case GET_ACCESS_TOKEN: {
            return action.payload
        }
        case VERIFY_TOKEN: {
            return action.payload
        }
        default:
            return state;
    }
}