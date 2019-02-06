import { GET_USER_INFO } from '../../actions/types';
export const userinfo = (state: any = [], action: any) => {
    switch (action.type) {
        case GET_USER_INFO:
            return action.payload
        default:
            return state;
    }
}