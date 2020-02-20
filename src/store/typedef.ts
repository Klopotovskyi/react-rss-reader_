// import {Action} from 'redux';
// import {ThunkAction} from 'redux-thunk'

import {State as streamlistState} from '../modules/StreamList/services/reducers';


export interface AppState {
    streams: streamlistState
}



declare module 'react-redux' {
    export interface DefaultRootState extends AppState {}
}

