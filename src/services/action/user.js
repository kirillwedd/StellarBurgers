export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_TOKEN_FAIL="UPDATE_USER_TOKEN_FAIL";
export const FORGOT_PASSWORD="FORGOT_PASSWORD";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginUser = (user, accessToken, refreshToken) => ({
    type: LOGIN_USER,
    payload: { user, accessToken, refreshToken }
});

export const registerUser = (name, refreshToken, accessToken) => ({
    type: REGISTER_USER,
    payload: { name, refreshToken, accessToken },

});

export const registerUserFail = (error) => ({
    type: REGISTER_USER_FAIL,
    payload: { error }
});

export const loginUserFail = (error) => ({
    type: LOGIN_FAIL,
    payload: { error }
});

export const updateUserTokenFail=()=>({
    type: UPDATE_USER_TOKEN_FAIL,
    payload: {error}

})

export const loginRequest = (userData) => ({
    type: LOGIN_REQUEST,
    payload: {userData}

});

export const logout = () => ({
    type: LOGOUT,
    
});

export const loginSuccess = () => ({ 
    type: LOGIN_SUCCESS 
});

export const forgotPassword= ()=> ({
    type: FORGOT_PASSWORD
})

