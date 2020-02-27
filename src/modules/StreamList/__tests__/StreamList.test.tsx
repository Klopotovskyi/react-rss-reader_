import React from 'react';
import StreamList from '../StreamList'
import {mount, ReactWrapper, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store'
import {apiMiddleware, RSAA} from 'redux-api-middleware'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    ADD_STREAM_SUCCESS,
    LOAD_STREAMS_FAILURE,
    LOAD_STREAMS_REQUEST,
    LOAD_STREAMS_SUCCESS
} from '../services/constants';
import {addStream} from '../services/actions';

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

// jest.mock('../services/actions', () => ({
//     addStream: jest.fn()
// }));
describe('should dispatch LOAD_STREAMS_SUCCESS when loadStreams is called', () => {
    const body = ["https://fakty.ua/rss_feed/science",
        "https://www.radiosvoboda.org/api/zrqiteuuir/",
        "http://4pda.ru/feed/",
        "https://www.pravda.com.ua/rss/view_news/",]
    ;
    const store = mockStore({streamList: body});
    const getMockResponse = () => {
        return fetchMock.getOnce(`https://rss-reader-676d2.firebaseio.com/TestArray.json`, {headers: {'content-type': 'application/json'}});
    };
    describe('when rendered', () => {

        it('should not be active saved button', () => {
            const store = mockStore({});
            getMockResponse();
            const expectedActions = [
                {type: LOAD_STREAMS_REQUEST},
                {type: LOAD_STREAMS_SUCCESS, payload: body}
            ];
            return store.dispatch({
                [RSAA]: {
                    endpoint: 'https://rss-reader-676d2.firebaseio.com/TestArray.json',
                    method: 'GET',
                    types: [LOAD_STREAMS_REQUEST, LOAD_STREAMS_SUCCESS, LOAD_STREAMS_FAILURE]
                }
            }).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });
    describe('when add button clicked', () => {

        it('should add input url to list of streams', () => {
            fetchMock.reset();
            fetchMock.restore();
            getMockResponse();
            return store.dispatch({
                [RSAA]: {
                    endpoint: 'https://rss-reader-676d2.firebaseio.com/TestArray.json',
                    method: 'GET',
                    types: [LOAD_STREAMS_REQUEST, LOAD_STREAMS_SUCCESS, LOAD_STREAMS_FAILURE]
                }
            }).then(() => {
                const wrapper = mount(<Provider store={store}><StreamList/></Provider>);
                wrapper.find('.add-stream-btn').simulate('click');
                wrapper.find('input').simulate('change', {
                    currentTarget: {
                        value: 'newStream'
                    }
                });
                expect(addStream).toHaveBeenCalledWith({
                    payload: 'newStream'
                });

                expect(wrapper.find('.list-of-streams').children().length).toEqual(4);
                fetchMock.reset();
                fetchMock.restore();
            });


        });
    });
});







