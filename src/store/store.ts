import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from './root-reducer';
import thunk from 'redux-thunk';
import {apiMiddleware} from 'redux-api-middleware';


export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, apiMiddleware)
    )
);
