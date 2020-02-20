import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Item} from '../../components/Item/Item';
import StreamView from '../StreamView/StreamView';
import '../StreamList/StreamList.css'
import {store} from '../../store';
import {useSelector} from 'react-redux';


const StreamList = () => {
    const [listOfStreams, SetListOfStreams] = useState(['']);
    const [newStream, SetNewStream] = useState('');
    const [currentStreamFeed, SetCurrentStreamFeed] = useState({
        streamTitle: 'Please choose feed stream or add new',
        description: '',
        url: '',
        currentStreamItems: []
    });

    useEffect(() => {
            let list = localStorage.getItem('rssStreamsArray');
            if (list === undefined || list === null || list === '[]') {
                SetListOfStreams(["http://4pda.ru/feed/"]);
                localStorage.setItem('rssStreamsArray', JSON.stringify(["http://4pda.ru/feed/"]));
            } else {
                store.dispatch({
                    type: 'ADD_STREAM',
                    value: JSON.parse(localStorage.getItem('rssStreamsArray') || '[""]')
                });
                SetListOfStreams(JSON.parse(localStorage.getItem('rssStreamsArray') || '[""]'));
                //console.log(store.getState());
            }
        }, []
    );


    const getStreamData = (url: string) => {
        const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        axios.get(`${baseUrl}${url}`)
            .then((response => {
                    SetCurrentStreamFeed({
                        streamTitle: response.data.feed.title,
                        description: response.data.feed.description,
                        url: response.data.feed.url,
                        currentStreamItems: response.data.items
                    });
                    return response.data.status
                })
            )
            .catch(error => {
                console.warn(error);
                return error;
            });
    };
    const handleSubmit = () => {
        const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        axios.get(`${baseUrl}${newStream}`)
            .then(() => {

                    store.dispatch({
                        type: 'ADD_STREAM',
                        value: newStream
                    });
                    localStorage.setItem('rssStreamsArray', JSON.stringify([newStream, ...store.getState().streamlist]));
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
    const removeStream = (index: number) => {

        let cutListOfStreams = [...listOfStreams];
        cutListOfStreams.splice(index, 1);
        SetListOfStreams(cutListOfStreams);
        if (listOfStreams[index] === currentStreamFeed.url) {
            SetCurrentStreamFeed({
                streamTitle: '',
                description: '',
                url: '',
                currentStreamItems: []
            });
        }
        localStorage.setItem('rssStreamsArray', JSON.stringify(cutListOfStreams));
    };

    return (
        <div>
            <h2>List of streams</h2>
            <span>Please, input new rss-stream</span> <input value={newStream} onChange={onInputChange}/>
            <button onClick={handleSubmit}>Add</button>
            <ul className={'list-of-streams'}>
                {store.getState().streamlist.map((i, index) =>
                    <Item key={index}>
                        <div>
                            <button onClick={() => removeStream(index)}>del</button>
                            <span>{i}</span>
                            <button onClick={() => getStreamData(i)}>Get News</button>
                        </div>
                    </Item>
                )
                }
            </ul>
            <StreamView currentStreamFeed={currentStreamFeed}/>
        </div>
    )
};

export default StreamList