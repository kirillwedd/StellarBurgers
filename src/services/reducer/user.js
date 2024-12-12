import {  REGISTER_USER, REGISTER_USER_FAIL,  LOGIN_USER, LOGIN_FAIL, LOGOUT, UPDATE_USER_TOKEN_FAIL, FORGOT_PASSWORD, LOGIN_REQUEST, LOGIN_SUCCESS } from "../action/user";

const initialState = {
    isForgotPassword: false,
    loading: false,
    error: null,
    user: null,
    isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                 isLoggedIn: true,
                loading: false,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
         case LOGIN_REQUEST:
            return {
                ...state,
                 isLoggedIn: true,
                user: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                 isLoggedIn: true,
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
              isLoggedIn: false
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                isForgotPassword: true,
            }
        case LOGIN_SUCCESS: 
             return {
                ...state,
                isLoggedIn: true
             }
        

        default:
            return state;
            
    }
};