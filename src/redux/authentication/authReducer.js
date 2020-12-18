import { AUTHENTICATION_SUCCESS, LOGOUT_SUCCESS } from './authTypes';

const initialState = {
    id: null,
    attributes: null,
    isLoggedIn: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                id: action.id,
                attributes: action.attributes,
                isLoggedIn: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                id: null,
                attributes: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;