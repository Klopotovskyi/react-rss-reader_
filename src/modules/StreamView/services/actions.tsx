import {RSAA} from 'redux-api-middleware';
import {
    GET_STREAM_INFO, RESET_STREAM_INFO

} from './constants';

export const getStreamInfo = (url: string) => ({
    [RSAA]: {
        endpoint: `https://api.rss2json.com/v1/api.json?rss_url=${url}`,
        method: 'GET',
        types: GET_STREAM_INFO
    },
});
export const resetStreamInfo = () => ({
    type: RESET_STREAM_INFO
});