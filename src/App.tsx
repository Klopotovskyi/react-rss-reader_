import React from 'react';
import './App.css';
import StreamList from './modules/StreamList/StreamList';
import {Provider} from 'react-redux';
import {store} from './store'

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <StreamList/>
            </div>
        </Provider>
    );
}

export default App;
