import React, {useEffect, useState} from 'react';
import {Item} from '../../components/Item/Item';
import './StreamView.css';
import {StreamItem} from '../typedef';


type Props = {
    title: string,
    description: string,
    url: string,
    currentStreamItems: StreamItem []
};

const StreamView = (props: Props) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index: number) => {
        setActiveIndex(index)
    };
    useEffect(() => setActiveIndex(-1), [props.currentStreamItems]);

    return (
        <div>
            <h3>{props.title}</h3>
            <ul className={'stream-view-list'}>
                {props.currentStreamItems.map((i, index) =>
                    <Item key={index}>
                        <div style={activeIndex === index ? {background: '#e2efff'} : {}}>
                            <span><b>{i.title}</b></span>
                            <button style={activeIndex === index ? {display: 'none'} : {display: 'block'}}
                                    onClick={() => handleClick(index)}>review
                            </button>
                            <p>Publication Date: {i.pubDate}</p>
                            <div style={activeIndex === index ? {display: 'block'} : {display: 'none'}}>{i.content} ...
                                <p><a href={i.link} target="_blank" rel="noopener noreferrer">Read moore</a></p>
                            </div>
                        </div>
                    </Item>
                )
                }
            </ul>
        </div>
    )
};

export default StreamView