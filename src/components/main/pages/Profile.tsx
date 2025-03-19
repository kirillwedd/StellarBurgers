import React, { useEffect, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Profile.module.scss';
import  stylesfeed from '../pages/Feed.module.scss'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { fetchUserData, refreshTokenUp, updateUserData } from '../../../services/action/thunk/UserAction';
import { request } from '../../../utils/apiUtils';
import { API_URL } from '../../../apiConfig';
import { logout } from '../../../services/action/user';
import { User } from '../../../services/reducer/types/userTypes';
import { useAppDispatch } from '../../../services/hooks';
import { CardOrderProfile } from '../items-pages/CardOrderProfile';
import { IApiResponse, IOrder } from '../../../services/reducer/types/wsTypes';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { CardOrder } from '../items-pages/CardOrder';


interface IProfile {
    children?: React.ReactNode;
}

export function Profile({children}: IProfile) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const accessToken = JSON.parse(localStorage.getItem('users') || '{}')?.accessToken; 
    const tokenWithoutBearer = accessToken.split(' ')[1];
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [originalUserData, setOriginalUserData] = useState<{ name?: string; email?: string }>({});
    const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]); // Создайте состояние для ингредиентов
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
   
    useEffect(() => {
        // Функция для получения доступных ингредиентов
        const fetchIngredients = async () => {
            const response = await request(`${API_URL}/ingredients`); // Замените на ваш API для получения ингредиентов
            if (response.success) {
                setAvailableIngredients(response.data); 
            }
        };

        fetchIngredients(); // Вызовем эту функцию, чтобы загрузить ингредиенты при монтировании компонента
    }, []);

    useEffect(() => {
        if (!accessToken) {
            console.error('Ошибка: отсутствует токен доступа');
            return;
        }
    
        const socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${tokenWithoutBearer}`);
        
        socket.onopen = () => {
            console.log('WebSocket соединение установлено');
        };
    
        socket.onmessage = (event) => {
            const data: IApiResponse = JSON.parse(event.data);
            if (data.success) {
                setOrders(data.orders || []);
            } else if (data.message === "Invalid or missing token") {
                console.error(tokenWithoutBearer);
            }
        };
    
        socket.onerror = (error) => {
            console.error('Ошибка WebSocket:', error);
        };
    
        return () => {
            socket.close();
            console.log('WebSocket соединение закрыто');
        };
    }, [accessToken]);

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
            }
            catch(error){
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
        const updateData: User = {
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
                {
                    children === "profile" ?
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
                    : 
                        <section className={`${stylesfeed.orders}`}>
                            {orders.map((order, index) => {
                                // Преобразование массива идентификаторов в массив объектов ингредиентов
                                const ingredientsBurgers: Ingredient[] = order.ingredients.map(ingredientId => 
                                    availableIngredients.find(ingredient => ingredient._id === ingredientId)
                                ).filter((ingredient): ingredient is Ingredient => ingredient !== undefined); 

                                return (
                                    <CardOrder key={index} title={order.name} id={order.number} createdAt={order.createdAt} status={order.status} ingredientsBurgers={ingredientsBurgers} />
                                );
                            })}
                        </section>
                }
            </section>
        </div>
    );
}