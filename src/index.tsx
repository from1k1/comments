import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { comboReducers } from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
const store = createStore(comboReducers, {}, applyMiddleware(reduxPromise));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);