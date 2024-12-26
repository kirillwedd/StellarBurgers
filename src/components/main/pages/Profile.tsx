import React, { useEffect, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Profile.module.scss';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { fetchUserData, refreshTokenUp, updateUserData } from '../../../services/action/thunk/UserAction';
import { request } from '../../../utils/apiUtils';
import { API_URL } from '../../../apiConfig';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/action/user';
import { AppDispatchUser } from '../../../services/store';
import { User } from '../../../services/reducer/types/userTypes';

export function Profile() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [originalUserData, setOriginalUserData] = useState<{ name?: string; email?: string }>({});
    const dispatch = useDispatch<AppDispatchUser>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            const refreshToken = JSON.parse(localStorage.getItem('users') || '{}')?.refreshToken || '';
            try {
                const userData = await dispatch(fetchUserData());
                const storedUser = JSON.parse(localStorage.getItem('users') || '{}')?.user;
                setOriginalUserData(userData);
                setName(userData.name || '');
                setEmail(userData.email || '');
                setPassword(storedUser?.password || '');
            } catch (error) {
                await dispatch(refreshTokenUp(refreshToken));
                const userData = await dispatch(fetchUserData());
                const storedUser = JSON.parse(localStorage.getItem('users') || '{}')?.user;
                setOriginalUserData(userData);
                setName(userData.name || '');
                setEmail(userData.email || '');
                setPassword(storedUser?.password || '');
            }
        };
        loadUserData();
    }, [dispatch]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateData : User = {
            name,
            email,
            password: password || undefined 
        };

        try {
            const response = await updateUserData(updateData);

            if (response.success) {
                console.log('Данные успешно обновлены:', response.user);
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    };

    const handleCancel = () => {
        setName(originalUserData.name || '');
        setEmail(originalUserData.email || '');
        setPassword('');
    };

    const handleExit = async (e: React.FormEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const refreshToken = JSON.parse(localStorage.getItem('users') || '{}')?.refreshToken || '';
        const response = await request(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }) 
        });

        if(response.success) {
            localStorage.removeItem('isAuthorized');
            localStorage.removeItem('users');
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <div className={styles.profile}>
            <section className={`${styles.profileNavigate} mr-15`}>
                <NavLink 
                    className={({ isActive }) => `${styles.profileNavigate__navLink} text_type_main-medium ${isActive ? styles.active : ''}`} 
                    to="/profile"
                >
                    Профиль
                </NavLink>
                <NavLink 
                    className={({ isActive }) => `${styles.profileNavigate__navLink} text_type_main-medium ${isActive ? styles.active : ''}`} 
                    to="/profile/orders"
                >
                    История заказов
                </NavLink>
                <NavLink 
                    className={({ isActive }) => `${styles.profileNavigate__navLink} text_type_main-medium ${isActive ? styles.active : ''}`} 
                    to="/"
                    onClick={handleExit}
                >
                    Выход
                </NavLink>
                <div className={`${styles.textInform} mt-20 text_type_main-default`}>
                    В этом разделе вы можете <br /> изменить свои персональные данные
                </div>
            </section>
            <section className={styles.profileChanges}>
                <form onSubmit={handleSave}>
                    <Input 
                        placeholder="Имя" 
                        type="text" 
                        icon="EditIcon" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <EmailInput 
                        placeholder="Логин" 
                        extraClass="mt-6" 
                        isIcon={true} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <PasswordInput 
                        placeholder="Пароль" 
                        extraClass="mt-6" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <div className={`${styles.actions} mt-6`}>
                        <button 
                            type='button' 
                            onClick={handleCancel} 
                            className={`${styles.cancel} text_type_main-default`}
                        >
                            Отмена
                        </button>
                        <Button 
                            htmlType="submit" 
                            extraClass="ml-5"
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}