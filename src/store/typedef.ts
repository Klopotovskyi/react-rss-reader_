
import {State as StreamState} from '../modules/StreamList/services/reducers';
import {State as ViewState} from '../modules/StreamView/services/reducers'



export interface AppState {
    streamList: StreamState,
    streamView: ViewState
}


declare module 'react-redux' {
    export interface DefaultRootState extends AppState {}
}

