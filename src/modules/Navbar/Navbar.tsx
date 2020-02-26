import React from 'react';
import {Link} from 'react-router-dom';

const  Navbar = () => {
     return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/reader">Reader</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </div>
        )
 };

export default Navbar