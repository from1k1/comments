import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { asyncMiddleware } from './middlewares/async';
import { comboReducers } from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import * as axios from 'axios';
const store = createStore(comboReducers, {}, applyMiddleware(asyncMiddleware));
const authToken = localStorage.getItem("UserTOKEN");
if (authToken) {
    axios.default.defaults.headers['Authorization'] = authToken;
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);