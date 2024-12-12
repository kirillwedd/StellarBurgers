
import { json } from "react-router-dom";
import { API_URL } from "../../../apiConfig";
import { request } from "../../../utils/apiUtils";
import {  registerUserFail, loginUserFail, updateUserTokenFail, loginRequest } from "../user";



export const registerUserAction = (userData, navigate) => {
;
    return async (dispatch) => {
     
        try {
            
            const response = await request(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });      
            
            if(response.success)
            {

            const userObj= {
                user: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                },
                refreshToken: response.refreshToken,
                accessToken: response.accessToken
            }
            
                const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
                existingUsers.push(userObj);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                navigate('/login');
            }

        } catch (error) {
            dispatch(registerUserFail(error.message));
        }
    };
};


export const loginUserAction = (userData, navigate) => {

    return async (dispatch) => {
        try {
            const response = await request(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });    
             
            if (response.success) {       
            
                const user={
                    user: {
                        name:  response.user.name,
                        email: response.user.email,
                        password: userData.password,
                    },
                    accessToken: response.accessToken, 
                    refreshToken: response.refreshToken
    
                }
               
                localStorage.setItem('users', JSON.stringify(user))
                localStorage.setItem('isAuthorized', 'true');
                dispatch(loginRequest(user.user));
                navigate('/');
            } else {
                dispatch(loginUserFail("Авторизация не удалась"));
            }
        } catch (error) {
            dispatch(loginUserFail(error.message));
        }
    };
};

export const refreshTokenAction = (refreshTokenStore) => {
    
    return async (dispatch) => {
        try {
            const response = await request(`${API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(refreshTokenStore)
            });

            if (response.success) {
                const { accessToken, refreshToken } = response;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                dispatch(updateUserTokenFail("Ошибка обновления токена"))
            }
        } catch (error) {
            dispatch(updateUserTokenFail(error.message))
        }
    };
};


export const fetchUserData = () => {
    return async ()=> {
        try {
        const token = JSON.parse(localStorage.getItem('users'))?.accessToken;
        
        const response = await request(`${API_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
        });

        if(response.success)
        {
            return response.user
        }
        else{
            const refreshTokenStore = {
                refreshToken: JSON.parse(localStorage.getItem('users'))?.refreshToken
            };
            refreshTokenAction(refreshTokenStore)
            token = JSON.parse(localStorage.getItem('users'))?.accessToken;

            const responseUser = await request(`${API_URL}/auth/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            
            return responseUser.user;
        }


        
    }
     catch (error) {
        console.error('Ошибка при получении пользовательских данных:', error);
        throw error; 
    }
}
};

export const updateUserData = async (updateData) => {
    const token = JSON.parse(localStorage.getItem('users'))?.accessToken;
    const response = await request(`${API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify(updateData),
    });

    const users = JSON.parse(localStorage.getItem('users')) || {};
    users.user = updateData;
    localStorage.setItem('users', JSON.stringify(users)); 

    if (!response.success) {
        throw new Error('Ошибка обновления данных пользователя');
    }

    return response;
};