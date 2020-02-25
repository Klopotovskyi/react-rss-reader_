import React, {useEffect, useState} from 'react';
import {Item} from '../../components/Item/Item';
import './StreamView.css';
import {useSelector} from 'react-redux';


const StreamView = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index: number) => {
        setActiveIndex(index)
    };
    const currentStreamFeed = useSelector(state => state.streamView);
    useEffect(() => setActiveIndex(-1), [currentStreamFeed.currentStreamItems]);

    return (
        <>
            {currentStreamFeed.title !=='' && <div className={'stream-view-container'}>
                <h3>{currentStreamFeed.title}</h3>
                <ul className={'stream-view-list'}>
                    {currentStreamFeed.currentStreamItems.map((i, index) =>
                        <Item key={index}>
                            <div style={activeIndex === index ? {background: '#e2efff'} : {}}>
                                <span><b>{i.title}</b></span>
                                <button style={activeIndex === index ? {display: 'none'} : {display: 'block'}}
                                        onClick={() => handleClick(index)}>review
                                </button>
                                <p>Publication Date: {i.pubDate}</p>
                                <div
                                    style={activeIndex === index ? {display: 'block'} : {display: 'none'}}>{i.content} ...
                                    <div><a href={i.link} target="_blank" rel="noopener noreferrer">Read moore</a></div>
                                </div>
                            </div>
                        </Item>
                    )
                    }
                </ul>
            </div>}
        </>
    )
};

export default StreamView