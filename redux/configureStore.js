import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { places } from './places';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            places,
            comments,
            partners,
            promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}