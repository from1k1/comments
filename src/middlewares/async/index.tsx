import { Middleware } from 'redux';
import { ActionTypes } from '../../actions';
import { AxiosResponse } from 'axios';
export const asyncMiddleware: Middleware<ActionTypes> = ({ dispatch }) => next => (action) => {
    console.log("MIDDLEWARE:", action);
    if (!action.payload || !action.payload.then) {
        return next(action);
    }
    action.payload.then((response: any) => {
        const newAction = { ...action, payload: response }
        dispatch(newAction);
    });
}