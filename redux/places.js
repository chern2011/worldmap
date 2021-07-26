import * as ActionTypes from './ActionTypes';

export const places = (state = { isLoading: true,
                                     errMess: null,
                                     places: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PLACES:
            return {...state, isLoading: false, errMess: null, places: action.payload};

        case ActionTypes.PLACES_LOADING:
            return {...state, isLoading: true, errMess: null, places: []}

        case ActionTypes.PLACES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};