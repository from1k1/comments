import { GET_USER_LIST } from '../../actions/types';
export const userList = (state: any = [], action: any) => {
    switch (action.type) {
        case GET_USER_LIST:
            return [...action.payload]
        default:
            return state;
    }
}