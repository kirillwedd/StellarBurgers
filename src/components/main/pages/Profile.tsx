import React, { useEffect, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Profile.module.scss';
import  stylesfeed from '../pages/Feed.module.scss'
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { fetchUserData, refreshTokenUp, updateUserData } from '../../../services/action/thunk/UserAction';
import { request } from '../../../utils/apiUtils';
import { API_URL, ORDER_SOCKET_URL } from '../../../apiConfig';
import { logout } from '../../../services/action/user';
import { User } from '../../../services/reducer/types/userTypes';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { IApiResponse, IOrder } from '../../../services/reducer/types/wsTypes';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { CardOrder } from '../items-pages/CardOrder';
import { SetOrderPopUp, useSocket } from '../../../services/action/ws';



interface IProfile {
    children?: React.ReactNode;
}

export function Profile({children}: IProfile) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const accessToken = JSON.parse(localStorage.getItem('users') || '{}')?.accessToken; 
    const tokenWithoutBearer = accessToken.split(' ')[1];
    const { orders } = useAppSelector((state) => state.ws);
    const [ordersProfile, setOrdersProfile] = useState<IOrder[]>([]);
    const [originalUserData, setOriginalUserData] = useState<{ name?: string; email?: string }>({});
    const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]); 
    const [fetchedOrder, setFetchedOrder] = useState(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
   
    useEffect(() => {
        
        const fetchIngredients = async () => {
            const response = await request(`${API_URL}/ingredients`); 
            if (response.success) {
                setAvailableIngredients(response.data); 
            }
        };

        fetchIngredients(); 
    }, []);

    const { connect } = useSocket(`${ORDER_SOCKET_URL}`, {
        onMessage: (event: MessageEvent) => {
            const data: IApiResponse = JSON.parse(event.data);
            if (data.success) {
                setOrdersProfile(data.orders || []);
            } else if (data.message === "Invalid or missing token") {
                console.error("Invalid token");
            }
        },
        onConnect: () => console.log('WebSocket connection established'),
        onDisconnect: () => console.log('WebSocket connection closed'),
        onError: (error) => console.error('WebSocket error:', error)
    });

    useEffect(() => {
        if (accessToken) {
            connect(tokenWithoutBearer); 
        } else {
            console.error('Access token is missing');
        }

        
        const fetchIngredients = async () => {
            const response = await request(`${API_URL}/ingredients`);
            if (response.success) {
                setAvailableIngredients(response.data);
            }
        };

        fetchIngredients();
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

    const handleCardClick = async (orderNumber: number) => {
        const existingOrder = orders.find((order: IOrder) => order.number === orderNumber);

        if (!existingOrder) {
            try {
                const response = await fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`);
                if (!response.ok) throw new Error('Ошибка при загрузке заказа');
                
                const data = await response.json();
                dispatch(SetOrderPopUp(data.orders[0])); // Храните полученные данные для дальнейшего использования
            } catch (error) {
                console.error('Ошибка:', error);
                // Здесь можно добавить логику для отображения ошибки пользователю
            }
        }
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
                            {ordersProfile.map((order, index) => {
                            
                                const ingredientsBurgers: Ingredient[] = order.ingredients.map(ingredientId => 
                                    availableIngredients.find(ingredient => ingredient._id === ingredientId)
                                ).filter((ingredient): ingredient is Ingredient => ingredient !== undefined); 

                                return (
                                    <CardOrder key={index} locationLink={'профиль'} onClick={()=>handleCardClick(order.number)} title={order.name} id={order.number} createdAt={order.createdAt} status={order.status} ingredientsBurgers={ingredientsBurgers} />
                                );
                            })}
                        </section>
                }
            </section>
        </div>
    );
}