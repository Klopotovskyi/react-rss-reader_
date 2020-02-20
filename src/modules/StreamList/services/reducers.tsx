import {Reducer} from 'redux';

export type State = string[];
export const streamlist: Reducer<State> = (state = [], action) => {
if(action.type === 'ADD_STREAM'){
     return state.concat(action.value);
}
    return state;
};
