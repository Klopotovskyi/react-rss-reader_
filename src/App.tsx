import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store'
import About from './modules/About/About';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Reader from './modules/Reader/Reader';
import Homepage from './modules/Homepage/Homepage';
import Navbar from './modules/Navbar/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path='/home' component={Homepage}/>
                        <Route path='/reader' component={Reader}/>
                        <Route path='/about' component={About}/>
                        <Redirect to='/home'/>
                        <Route path='*'>
                            404 Not found
                        </Route>
                    </Switch>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
