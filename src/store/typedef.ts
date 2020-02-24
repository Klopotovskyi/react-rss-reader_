import {Action} from 'redux';
import {State as StreamState} from '../modules/StreamList/services/reducers';
import {State as ViewState} from '../modules/StreamView/services/reducers'
import {ThunkAction} from 'redux-thunk';


export interface AppState {
    streamList: StreamState,
    streamView: ViewState
}

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
//     AppState,
//     null,
//     Action<string>>

declare module 'react-redux' {
    export interface DefaultRootState extends AppState {}
}

