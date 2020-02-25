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
    const [disableButton, setDisableButton] = useState(true);
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
                    setDisableButton(false);
                    setNewStream('');
                }
            )
            .catch(() => {
                setNewStream('');
                setDisableButton(false);
                alert('This rss-feed URL NOT supported! Try another one');
            });
    };

    const sync = () => {
        streamsRef.set(streams);
        setDisableButton(true);
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStream(e.target.value);
    };
    const removeItem = (index: number) => {
        dispatch(removeStream(index));
        dispatch(resetStreamInfo());
        setDisableButton(false);
    };

    return (
        <>
            <div className={'stream-list-container'}>
                <h2>List of streams</h2>
                <div className={'input-field'}>
                    <span>Please, input new rss-stream</span>
                    <div>
                        <input value={newStream} onChange={onInputChange} placeholder={'enter your RSS feed URL'}/>
                        <button onClick={handleSubmit}>Add</button>
                    </div>
                </div>
                <ul className={'list-of-streams'}>
                    {streams.map((i, index) =>
                        <Item key={index}>
                            <div className={'list-item'}>
                                <span>{i}</span>
                                <div>
                                    <button onClick={() => getStreamData(i)}>Get News</button>
                                    <button onClick={() => removeItem(index)} className={'remove-button'}>X</button>
                                </div>
                            </div>
                        </Item>
                    )
                    }
                </ul>
                <strong>Please, choose some RSS feed or add new one</strong>
                <div>
                    <button onClick={() => sync()} disabled={disableButton}>Save current list</button>
                </div>
            </div>
        </>
    )
};

export default StreamList