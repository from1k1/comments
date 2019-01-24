import { SAVE_COMMENT, FETCH_COMMENTS } from '../../actions/types';
export const commentReducer = (state: any = [], action:any) => {
    switch (action.type) {
        case SAVE_COMMENT:
            return [...state, action.payload]
        case FETCH_COMMENTS:
            return [...state, ...action.payload]
        default:
            return state;
    }
}