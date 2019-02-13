import { RECEIVE_MESSAGE } from '../../actions/types';
export const messagesReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return [...state, action.payload]
        default:
            return state;
    }
}