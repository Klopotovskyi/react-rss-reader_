import {mount, ReactWrapper, shallow} from 'enzyme';
import StreamView from '../StreamView';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';



describe('Get news items of rss feed ', () => {
    describe('when rendered', () => {
        const mockStore = configureStore();
        let store, wrapper: ReactWrapper;
        store = mockStore({streamView: {title:''}});
        wrapper = mount(<Provider store={store}><StreamView/></Provider>);
        it('should StreamView  component hide', () => {
            expect(wrapper.find('.stream-view-container').length).toBe(0);
        });
    });

    describe('when rendered with not empty input stream data', () => {

        const mockStore = configureStore();
        let store, wrapper: ReactWrapper;
        beforeEach(() => {
            const initialState = {
                streamView: {
                    title: 'StreamTitle',
                    description: 'description',
                    url: 'url',
                    currentStreamItems: [{
                        title: 'title',
                        pubDate: 'pubDate',
                        link: 'link',
                        content: 'content',
                        author: 'author'
                    }]
                }
            };
            store = mockStore(initialState);
            wrapper = mount(<Provider store={store}><StreamView/></Provider>);

        });
        it('should StreamView  component shown', () => {
            expect(wrapper.find('.stream-view-container').length).toBe(1)
        });
        it('should list of news of current stream equal `currentStreamItems` length', () => {
            expect(wrapper.find('.stream-view-list').children().length).toEqual(1)
        });
        it('should handleClick function called after every click to "review" button', () => {
            const handleClick = jest.fn();
           wrapper.find('.review-btn').simulate('click');
            expect(handleClick.call.length).toBe(1);
        });
    });

});