import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Item} from '../../components/Item/Item';
import StreamView from '../StreamView/StreamView';
import '../StreamList/StreamList.css'
import {useDispatch, useSelector} from 'react-redux';
import {addStream, loadStreams, removeStream} from './services/actions';
import {getStreamInfo, resetStreamInfo} from '../StreamView/services/actions';

const StreamList = () => {
    const [newStream, setNewStream] = useState('');
    const dispatch = useDispatch();
    const currentStreamFeed = useSelector(state => state.streamView);
    const streams = useSelector(state => state.streamList);

    useEffect(() => {
        dispatch(loadStreams());
    }, []);

    const getStreamData = (url: string) => {
        dispatch(getStreamInfo(url))
    };
    const handleSubmit = () => {
        const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        axios.get(`${baseUrl}${newStream}`)
            .then(() => {
                    dispatch(addStream(newStream));
                    setNewStream('');
                }
            )
            .catch(() => {
                setNewStream('');
                alert('This rss-feed URL NOT supported! Try another one');
            });
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStream(e.target.value);
    };
    const removeItem = (index: number) => {
        dispatch(removeStream(index));
        dispatch(resetStreamInfo());
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
            < StreamView title={currentStreamFeed.title}
                         description={currentStreamFeed.description}
                         url={currentStreamFeed.url}
                         currentStreamItems={currentStreamFeed.currentStreamItems}/>
        </div>
    )
};

export default StreamList