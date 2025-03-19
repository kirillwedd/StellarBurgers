import { useEffect, useState } from 'react';
import { CardOrder } from '../items-pages/CardOrder';
import styles from '../pages/Feed.module.scss';
import { ORDER_SOCKET_URL } from '../../../apiConfig';
import { Board } from '../items-pages/Board';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { IApiResponse, IOrder } from '../../../services/reducer/types/wsTypes';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { setOrders } from '../../../services/action/ws';

export function Feed() {
    const dispatch = useAppDispatch();
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);

    // Получаем ингредиенты из состояния
    const ingredientsInStore = useAppSelector(state => state.burgerIngredients.ingredients);
    const ordersDone = useAppSelector(state => state.ws.orders); // Получаем готовые заказы

    // Функция для сопоставления идентификаторов ингредиентов с объектами
    const getIngredientsFromIds = (ids: string[]): Ingredient[] => {
        return ingredientsInStore.filter(ingredient => ids.includes(ingredient._id));
    };

    const groupedOrders = (orders: IOrder[], limit: number, statusFilter?: string) => {
        return orders
            .filter(order => !statusFilter || order.status === statusFilter) // Фильтруем заказы по статусу, если фильтр указан
            .slice(0, limit); // Ограничиваем результат первым 'limit' заказам
    };

    useEffect(() => {
        const socket = new WebSocket(`${ORDER_SOCKET_URL}/all`);

        socket.onopen = () => {
            console.log('WebSocket подключен');
        };

        socket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
        };

        socket.onmessage = (event) => {
            const data: IApiResponse = JSON.parse(event.data);

            if (data.success && Array.isArray(data.orders)) {
                setTotal(data.total);
                setTotalToday(data.totalToday);
                dispatch(setOrders(data.orders));
            }
        };

        return () => {
            socket.close();
        };
    }, []);

    const completedOrders = groupedOrders(ordersDone, 10, 'done'); // Получаем первые 10 готовых заказов
    const pendingOrders = groupedOrders(ordersDone, 10, 'pending');

    return (
        <div className={`${styles.feedLayout}`}>
            <div className={`${styles.feedHeader} text_type_main-large mb-5`}>Лента заказов</div>
            <section className={`${styles.feed}`}>
                <section className={`${styles.orders} mr-15 mt-5}`}>
                    {ordersDone.map((order : IOrder, index: number) => {
                        const ingredientsBurgers = getIngredientsFromIds(order.ingredients);
                        return (
                            <CardOrder key={index} title={order.name} id={order.number} createdAt={order.createdAt} ingredientsBurgers={ingredientsBurgers} />
                        );
                    })}
                </section>

                <section className={`${styles.feedStats}`}>
                    <article className={`${styles.boards}`}>
                        <Board
                            title='Готовы:'
                            groupedOrders={completedOrders} 
                            className=''
                        />

                        <Board
                            title='В ожидании:'
                            groupedOrders={pendingOrders} 
                            className=''
                        />

                      
                    </article>
                    <article className={`${styles.board} mt-15`}>
                        <div className={`text_type_main-medium ${styles.board__titleCompleted}`}>Выполнено за все время:</div>
                        <div className={`${styles.board__completed} text_type_digits-large`}>{total}</div>
                    </article>

                    <article className={`${styles.board} mt-15`}>
                        <div className={`text_type_main-medium ${styles.board__titleCompleted}`}>Выполнено за сегодня:</div>
                        <div className={`${styles.board__completed} text_type_digits-large`}>{totalToday}</div>
                    </article>
                </section>
            </section>
        </div>
    );
}