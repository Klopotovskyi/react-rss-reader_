import {RSAA} from 'redux-api-middleware';
import {ADD_STREAM, ADD_STREAM_SUCCESS, LOAD_STREAMS, LOAD_STREAMS_FAILURE, LOAD_STREAMS_SUCCESS} from './constants';
import {streamsRef} from '../../../firebase'

export const loadStreams = () => ({
    [RSAA]: {
        endpoint: 'https://rss-reader-676d2.firebaseio.com/stream.json',
        method: 'GET',
        types: LOAD_STREAMS
    },
});
export const addStream = (url: string)=>{
    return({
        type: ADD_STREAM_SUCCESS,
        payload: url
    })
};

// export const addItem = (id: string) => ({
//     [RSAA]: {
//         endpoint: 'http://localhost:3005/cart',
//         method: 'POST',
//         types: ADD_ITEM_TO_CART,
//         body: {
//             id
//         }
//     },
// });
