import * as ActionTypes from './ActionTypes';

export const postpros = (state = { errMess: null, postpros: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POSTPROS:
            return {...state, errMess: null, posts: action.payload};

        case ActionTypes.POSTPROS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_POSTPRO:
            let postpro = action.payload;
            postpro.id = state.postpros.length;
            return{...state, postpros: state.postpros.concat(postpro)};

        default:
            return state;
    }
};