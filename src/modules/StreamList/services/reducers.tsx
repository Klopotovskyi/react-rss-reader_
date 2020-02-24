import {Reducer} from 'redux';
import {ADD_STREAM_SUCCESS, LOAD_STREAMS_FAILURE, LOAD_STREAMS_SUCCESS} from './constants';
import {RSAAResultAction} from 'redux-api-middleware';

export type State = string [];
type Action = RSAAResultAction<string[]>;

export const streamlist: Reducer<State> = (state: State = [''], action) => {

    if (action.type === LOAD_STREAMS_SUCCESS && !action.error) {
       console.log(action.payload);
        return state.concat(action.payload);
    }
    if(action.type === ADD_STREAM_SUCCESS){
        console.log([...state, action.payload]);
        return [...state, action.payload]
    }

    return state;
};
