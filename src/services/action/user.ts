import { User } from '../reducer/types/userTypes';

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_TOKEN_FAIL = "UPDATE_USER_TOKEN_FAIL";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';

interface RegisterUserAction {
    type: typeof REGISTER_USER;
    payload: {
        name: string;
        accessToken: string;
        refreshToken: string;
        user: User
    };
}

interface RegisterUserFailAction {
    type: typeof REGISTER_USER_FAIL;
    payload: {
        error: string;
    };
}

interface LoginUserAction {
    type: typeof LOGIN_USER;
    payload: {
        user: User;  // Указываем тип User
        accessToken: string;
        refreshToken: string;
    };
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: User;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    payload: {
        error: string;
    };
}

interface UpdateUserTokenFailAction {
    type: typeof UPDATE_USER_TOKEN_FAIL;
    payload: {
        error: string;
    };
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
}

interface ForgotPasswordAction {
    type: typeof FORGOT_PASSWORD;
}

interface SetAuthorizedAction {
    type: typeof SET_AUTHORIZED;
}


export type UserActions = 
    | RegisterUserAction
    | RegisterUserFailAction
    | LoginUserAction
    | LoginRequestAction
    | LogoutAction
    | LoginFailAction
    | UpdateUserTokenFailAction
    | LoginSuccessAction
    | ForgotPasswordAction
    | SetAuthorizedAction;


export const loginUser = (user: User, accessToken: string, refreshToken: string): LoginUserAction => ({
    type: LOGIN_USER,
    payload: { user, accessToken, refreshToken }
});

export const registerUser = (name: string, refreshToken: string, accessToken: string): RegisterUserAction => ({
    type: REGISTER_USER,
    payload: { name, refreshToken, accessToken, user: {} as User },
});

export const registerUserFail = (error: string): RegisterUserFailAction => ({
    type: REGISTER_USER_FAIL,
    payload: { error }
});

export const loginUserFail = (error: string): LoginFailAction => ({
    type: LOGIN_FAIL,
    payload: { error }
});

export const updateUserTokenFail = (error: string): UpdateUserTokenFailAction => ({
    type: UPDATE_USER_TOKEN_FAIL,
    payload: { error }
});

export const loginRequest = (userData: User): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: userData 
});

export const logout = (): LogoutAction => ({
    type: LOGOUT
});

export const setAuthorized = (): SetAuthorizedAction => ({
    type: SET_AUTHORIZED
});

export const loginSuccess = (): LoginSuccessAction => ({ 
    type: LOGIN_SUCCESS 
});

export const forgotPassword = (): ForgotPasswordAction => ({
    type: FORGOT_PASSWORD
});