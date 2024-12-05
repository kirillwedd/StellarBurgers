import {  REGISTER_USER, REGISTER_USER_FAIL,  LOGIN_USER, LOGIN_FAIL, LOGOUT, UPDATE_USER_TOKEN_FAIL, FORGOT_PASSWORD } from "../action/user";

const initialState = {
    isForgotPassword: false,
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case UPDATE_USER_TOKEN_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: {
                    email: '',
                    name: '',
                },
                accessToken: '',
                refreshToken: '',
                isAuthenticated: false,
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                isForgotPassword: true,
            }
        

        default:
            return state;
            
    }
};