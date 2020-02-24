
import {RSAA} from 'redux-api-middleware';
import {
    GET_STREAM_INFO

} from './constants';
//import {streamsRef} from '../../../firebase'

export const getStreaminfo = (url: string) => ({
    [RSAA]: {
        endpoint: `https://api.rss2json.com/v1/api.json?rss_url=${url}`,
        method: 'GET',
        types: GET_STREAM_INFO
    },
});