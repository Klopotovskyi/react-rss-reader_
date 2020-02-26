import React from 'react';
import {Link} from 'react-router-dom';


const  About = () => {
     return (
        <div>
            <h3>This app developed by Klopotovskyi Pavlo</h3>
            <p><Link to ='mailto:patola@ukr.net'>Send e-mail</Link></p>
        </div>
        )
 };

export default About