import {combineReducers} from 'redux';
import {streamList} from '../modules/StreamList/services/reducers';
import {streamView} from '../modules/StreamView/services/reducers';

export const rootReducer = combineReducers({
    streamList,
    streamView
});
