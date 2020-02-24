import {Reducer} from 'redux';
import {StreamItem} from '../../typedef';
import {GET_STREAM_INFO_SUCCESS} from './constants';

export type State = {
    title: string,
    description: string,
    url: string,
    currentStreamItems: StreamItem []
} ;
const defaultStreamInfo = {
    title: '',
    description: '',
    url: '',
    currentStreamItems: []
};

export const streamView: Reducer<State> = (state: State = defaultStreamInfo, action) => {

    if (action.type === GET_STREAM_INFO_SUCCESS && !action.error) {
        return {
            title: action.payload.feed.title,
            description: action.payload.feed.description,
            url: action.payload.feed.url,
            currentStreamItems: action.payload.items
        };
    }
    else if (action.type === 'RESET_STREAM_INFO') {
        return defaultStreamInfo;
    }
    return state;
};