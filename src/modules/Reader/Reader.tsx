import React from 'react';
import StreamView from '../StreamView/StreamView';
import StreamList from '../StreamList/StreamList';
import './Reader.css';


const  Reader = () => {
     return (
        <div className={'main-page'}>
            <StreamList/>
            <StreamView/>
        </div>
        )
 };

export default Reader