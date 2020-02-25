import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Item} from '../../components/Item/Item';
import '../StreamList/StreamList.css'
import {useDispatch, useSelector} from 'react-redux';
import {addStream, loadStreams, removeStream} from './services/actions';
import {getStreamInfo, resetStreamInfo} from '../StreamView/services/actions';
import {streamsRef} from '../../firebase';


const StreamList = () => {
    const [newStream, setNewStream] = useState('');
    const dispatch = useDispatch();
    const streams = useSelector(state => state.streamList);

    useEffect(() => {
        dispatch(loadStreams());
    }, []);

    const getStreamData = (url: string) => {
        dispatch(getStreamInfo(url))
    };

    const handleSubmit = () => {
        axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${newStream}`)
            .then(() => {
                    dispatch(addStream(newStream));
                fetchStreamToBaseAdd(newStream);
                    setNewStream('');
                }
            )
            .catch(() => {
                setNewStream('');
                alert('This rss-feed URL NOT supported! Try another one');
            });
    };

    const fetchStreamToBaseAdd = (url: string) => {
        streamsRef.child(`${streams.length}`).set(url);
    };
    const fetchStreamToBaseRemove = () => {
        streamsRef.set(streams);
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStream(e.target.value);
    };
    const removeItem = (index: number) => {
        dispatch(removeStream(index));
        dispatch(resetStreamInfo());
       fetchStreamToBaseRemove();
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
            <strong>Please, choose some RSS feed or add new one</strong>

        </div>
    )
};

export default StreamList