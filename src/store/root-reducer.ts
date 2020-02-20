import {combineReducers} from 'redux';
import {streamlist} from '../modules/StreamList/services/reducers';

export const rootReducer = combineReducers({
    streamlist
});
