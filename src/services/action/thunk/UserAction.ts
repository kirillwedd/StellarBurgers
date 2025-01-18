import { json, useNavigate } from "react-router-dom";
import { API_URL } from "../../../apiConfig";
import { request } from "../../../utils/apiUtils";
import {
    REGISTER_USER_FAIL,
    LOGIN_FAIL,
    UPDATE_USER_TOKEN_FAIL,
    loginRequest,
    registerUserFail,
    loginUserFail,
    updateUserTokenFail,
    UserActions
} from "../user";
import { User } from "../../reducer/types/userTypes";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../../store";


export const registerUserAction = (userData: User) => {
    return async (dispatch: AppDispatch) => {
        const navigate = useNavigate(); 
        try {
            const response = await request(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.success) {
                const userObj = {
                    user: {
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                    },
                    refreshToken: response.refreshToken,
                    accessToken: response.accessToken
                };

                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
                existingUsers.push(userObj);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                navigate('/login');
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Ошибка регистрации";
            dispatch(registerUserFail(errorMessage));
        }
    };
};

export const loginUserAction = (userData: User, navigate: any)  => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await request(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.success) {
                const user = {
                    user: {
                        name: response.user.name,
                        email: response.user.email,
                        password: userData.password,
                    },
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken
                };
                
                localStorage.setItem('users', JSON.stringify(user));
                localStorage.setItem('isAuthorized', 'true');
                dispatch(loginRequest(user.user));
            } else {
                dispatch(loginUserFail("Авторизация не удалась"));
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Ошибка при авторизации";
            dispatch(loginUserFail(errorMessage));
        }
    };
};



export const refreshTokenUp = (refreshTokenStore: string) => {
    return async (dispatch: AppDispatch) => {
        const storedUser = JSON.parse(localStorage.getItem('users') || '{}'); 
        try {
            const response = await request(`${API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshTokenStore })
            });

            if (response.success) {
                const { accessToken, refreshToken } = response;

                const updatedUser = {
                    ...storedUser,
                    accessToken,
                    refreshToken,
                };

                localStorage.setItem('users', JSON.stringify(updatedUser));
               
                return accessToken; 
            } else {
                dispatch(updateUserTokenFail("Ошибка обновления токена"));
                
            }
        } catch (error) {
            dispatch(updateUserTokenFail((error as Error).message));
        }
    }
};

const fetchUser = async (token: any) => {
    return await request(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json',
        },
    });
};

export const InitialAuth= ()  => {
    return async () => { 
        try {
        const getToken = JSON.parse(localStorage.getItem('users') || '{}')?.accessToken; 
        

        
          
            if (!getToken) {
                throw new Error('Нет действительного токена.');
            }

            let response = await fetchUser(getToken);
            console.log(response)

            if (response.success==='false') {
                localStorage.removeItem("isAuthorized");
                localStorage.removeItem("users")
               
            } 
                   
        } catch (error) {
            console.error('Ошибка при получении пользовательских данных:', error);
            throw error; 
        }
    };
};

export const fetchUserData = ()  => {
    return async (dispatch: AppDispatch) => { 
        const getToken = () => JSON.parse(localStorage.getItem('users') || '{}')?.accessToken; 
        const getRefreshToken = () => JSON.parse(localStorage.getItem('users') || '{}')?.refreshToken; 

        
            let token = getToken();
            if (!token) {
                throw new Error('Нет действительного токена.');
            }

            let response = await fetchUser(token);
            
           
            if (response.success) {
                return response.user; 
            } else {
                const refreshTokenStore = getRefreshToken(); 
                    const newToken = await dispatch(refreshTokenUp(refreshTokenStore));
                    console.log(newToken) 
                        response = await fetchUser(newToken);
                        if (response.success) {
                            return response.user; 
                        }
                    
                
                
                throw new Error('Не удалось получить данные пользователя после обновления токена');
            }
        
    };
};
export const updateUserData = async (updateData: User) => {
    const userDataString = localStorage.getItem('users');
    const token = userDataString ? JSON.parse(userDataString).accessToken : '';

    const response = await request(`${API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify(updateData),
    });

    const users = JSON.parse(userDataString || '{}') || {};
    users.user = updateData;
    localStorage.setItem('users', JSON.stringify(users)); 

    if (!response.success) {
        throw new Error('Ошибка обновления данных пользователя');
    }

    return response;
};