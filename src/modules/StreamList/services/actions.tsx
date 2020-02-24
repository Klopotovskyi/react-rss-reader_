import {RSAA} from 'redux-api-middleware';
import {
    ADD_STREAM_SUCCESS,
    LOAD_STREAMS,
    REMOVE_STREAM_SUCCESS
} from './constants';
//import {streamsRef} from '../../../firebase'

export const loadStreams = () => ({
    [RSAA]: {
        endpoint: 'https://rss-reader-676d2.firebaseio.com/Streams.json',
        method: 'GET',
        types: LOAD_STREAMS
    },
});
export const addStream = (url: string) => {
    return ({
        type: ADD_STREAM_SUCCESS,
        payload: url
    })
};

export const removeStream = (index: number) => {
    return ({
        type: REMOVE_STREAM_SUCCESS,
        payload: index
    })
};

