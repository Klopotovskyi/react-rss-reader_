import {Action} from 'redux';
import {State as streamlistState} from '../modules/StreamList/services/reducers';
import {ThunkAction} from 'redux-thunk';


export interface AppState {
    streams: streamlistState
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    null,
    Action<string>>

declare module 'react-redux' {
    export interface DefaultRootState extends AppState {}
}

