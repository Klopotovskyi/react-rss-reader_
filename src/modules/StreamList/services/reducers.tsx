import {Reducer} from 'redux';
import {ADD_STREAM_SUCCESS, LOAD_STREAMS_SUCCESS, REMOVE_STREAM_SUCCESS} from './constants';

export type State = string [];

export const streamList: Reducer<State> = (state: State = [], action) => {

    if (action.type === LOAD_STREAMS_SUCCESS && !action.error) {
        return action.payload;
    } else if (action.type === ADD_STREAM_SUCCESS) {
        return [action.payload, ...state]
    } else if (action.type === REMOVE_STREAM_SUCCESS) {
        let stateSnapshot = [...state];
        stateSnapshot.splice(action.payload, 1);
        //console.log(stateSnapshot);
        return stateSnapshot;
    }

    return state;
};