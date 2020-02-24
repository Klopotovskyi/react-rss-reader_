import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Item} from '../../components/Item/Item';
import StreamView from '../StreamView/StreamView';
import '../StreamList/StreamList.css'//
//import {store} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {addStream, loadStreams, removeStream} from './services/actions';
import {getStreaminfo} from '../StreamView/services/actions';

const StreamList = () => {
    const [newStream, SetNewStream] = useState('');
    const dispatch = useDispatch();
    const currentStreamFeed = useSelector(state => state.streamView);


    useEffect(() => {
        dispatch(loadStreams());
    }, []);

    const streams = useSelector(state => state.streamList);

    console.log(streams);


    const getStreamData = (url: string) => {
        dispatch(getStreaminfo(url))
    };
    const handleSubmit = () => {
        const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        axios.get(`${baseUrl}${newStream}`)
            .then(() => {
                    dispatch(addStream(newStream));
                    SetNewStream('');
                }
            )
            .catch(() => {
                SetNewStream('');
                alert('This rss-feed URL NOT supported! Try another one');
            });
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        SetNewStream(e.target.value);
    };
    const removeItem = (index: number) => {
        dispatch(removeStream(index));
    };

    return (
        <div>
            <h2>List of streams</h2>
            <span>Please, input new rss-stream</span> <input value={newStream} onChange={onInputChange}/>
            <button onClick={handleSubmit}>Add</button>
            <ul className={'list-of-streams'}>
                {streams.map((i, index) =>
                    <Item key={index}>
                        <div>
                            <button onClick={() => removeItem(index)}>del</button>
                            <span>{i}</span>
                            <button onClick={() => getStreamData(i)}>Get News</button>
                        </div>
                    </Item>
                )
                }
            </ul>
            < StreamView title={currentStreamFeed.title}
                         description={currentStreamFeed.description}
                         url={currentStreamFeed.url}
                         currentStreamItems={currentStreamFeed.currentStreamItems}/>
        </div>
    )
};

export default StreamList