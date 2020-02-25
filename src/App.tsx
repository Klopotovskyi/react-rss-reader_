import React from 'react';
import './App.css';
import StreamList from './modules/StreamList/StreamList';
import {Provider} from 'react-redux';
import {store} from './store'
import StreamView from './modules/StreamView/StreamView';

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <StreamList/>
                <StreamView/>
            </div>
        </Provider>
    );
}

export default App;
