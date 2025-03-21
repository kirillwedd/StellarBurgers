import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../pages/FeedBurger.module.scss';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { StructureIngredient } from '../items-pages/StructureIngredient';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; 
import { IOrder } from '../../../services/reducer/types/wsTypes';
import { API_URL } from '../../../apiConfig';


interface IFeedBurger {
    hidden?: boolean;
}

export function FeedBurger({ hidden }: IFeedBurger) {
    const { number } = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orders } = useAppSelector(state => state.ws);
    const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);

    // Поиск заказа в данных WebSocket
    const orderPopUp = orders.find((order: IOrder) => order.number === Number(number));

    
    useEffect(() => {
        if (!orderPopUp) {
            fetch(`${API_URL}/orders/${number}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.orders) {
                        setCurrentOrder(data.orders[0]); // Предполагаем, что сервер возвращает массив заказов
                    }
                })
                .catch(error => {
                    console.error('Ошибка запроса:', error);
                });
        } else {
            setCurrentOrder(orderPopUp); 
        }
    }, [orderPopUp, number]);

    const ingredientsOrder = currentOrder ? currentOrder.ingredients : [];
    
    const { ingredients } = useAppSelector(state => state.burgerIngredients);

    // Группировка ингредиентов
    const groupedIngredients = ingredients.filter((ingredient: Ingredient) => ingredientsOrder.includes(ingredient._id)).reduce<Ingredient[]>((acc: Ingredient[], ingredient: Ingredient) => {
        const existing = acc.find(item => item.name === ingredient.name);
        
        if (existing) {
            existing.count! += 1; 
        } else {
            acc.push({ ...ingredient, count: 1 }); 
        }
        
        return acc;
    }, []);

    const bun = groupedIngredients.find(ingredient => ingredient.type === 'bun');
    const totalPrice = useMemo(() => {
        let price = 0;
        if (bun) {
            price += bun.price * 2;  
        }
        groupedIngredients.forEach(ingredient => {
            if (ingredient.type !== 'bun') {
                price += ingredient.price * (ingredient.count || 0); 
            }
        });
        return price; 
    }, [bun, groupedIngredients]);

    const filteredIngredients = groupedIngredients.filter(ingredient => ingredient.type !== 'bun'); 
    if (bun) {
        filteredIngredients.unshift(bun); 
    }
    
    if (!currentOrder) {
        return <div>Загрузка заказа...</div>; // Пока данные загружаются, можно показывать индикатор загрузки
    }

    return (
        <div className={` ${styles.feedBurgerLayout} ml-9`}>
            <div className={`${styles.feedInfo}`}>
                <p className={`${styles.feedBurgerOrderName} text_type_main-medium`}>{currentOrder.name}</p>
                <div className={`${styles.statusOrder} text_type_main-default mt-3`}>{currentOrder.status === 'done' ? 'выполнен' : 'в процессе'}</div>
            </div>
            <section className={`${styles.feedIngredients} mt-15`}>
                <div className={`${styles.titleStructure} text_type_main-medium`}>Состав:</div>
                <ul className={`${styles.orderStructure} mr-6`}>
                    {
                        filteredIngredients.map(ingredient => (
                            ingredient ? (
                                <StructureIngredient
                                    key={ingredient._id}
                                    count={ingredient.type === 'bun' ? 2 : ingredient.count}
                                    price={ingredient.price}
                                    src={ingredient.image}
                                    name={ingredient.name}
                                />
                            ) : null
                        ))
                    }
                </ul>
            </section>
            <div className={`${styles.feedTimePrice} mt-15`}>
                <div className={`${styles.feedTime} text_type_main-default`}><FormattedDate date={new Date(currentOrder.createdAt)} /></div>
                <div className={styles.feedPrice}>
                    <p className={`${styles.feedCost} text_type_digits-default mr-1`}>{totalPrice}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
}