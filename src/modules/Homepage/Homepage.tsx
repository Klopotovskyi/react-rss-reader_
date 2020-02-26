import React from 'react';
import {Link} from 'react-router-dom';
import './Homepage.css'

const Homepage = () => {
    return (
        <div className={'home-page-container'}>
            <h1>RSS feed reader V2.0</h1>
            <p>For start read some RSS feed click to the button below or navigate link on the top of this page</p>
            <Link to="/reader"><button className={'start-btn'}>GET START</button></Link>
        </div>
    )
};

export default Homepage