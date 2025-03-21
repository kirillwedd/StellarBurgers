import { useEffect, useState } from 'react';
import { CardOrder } from '../items-pages/CardOrder';
import styles from '../pages/Feed.module.scss';
import { ORDER_SOCKET_URL } from '../../../apiConfig';
import { Board } from '../items-pages/Board';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { IApiResponse, IOrder } from '../../../services/reducer/types/wsTypes';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { setOrders, useSocket } from '../../../services/action/ws';


export function Feed() {
    const dispatch = useAppDispatch();
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);

    const ingredientsInStore = useAppSelector(state => state.burgerIngredients.ingredients);
    const ordersDone = useAppSelector(state => state.ws.orders);

    const getIngredientsFromIds = (ids: string[]): Ingredient[] => {
        return ingredientsInStore.filter(ingredient => ids.includes(ingredient._id));
    };

    const groupedOrders = (orders: IOrder[], limit: number, statusFilter?: string) => {
        return orders
            .filter(order => !statusFilter || order.status === statusFilter)
            .slice(0, limit);
    };

    const { connect } = useSocket(`${ORDER_SOCKET_URL}/all`, {
        onConnect: () => console.log('WebSocket подключен'),
        onMessage: (event) => {
            const data: IApiResponse = JSON.parse(event.data);
            if (data.success && Array.isArray(data.orders)) {
                setTotal(data.total);
                setTotalToday(data.totalToday);
                dispatch(setOrders(data.orders));
            }
        },
        onError: (error) => console.error('WebSocket ошибка:', error),
        onDisconnect: () => console.log('WebSocket отключен')
    });

    

    const completedOrders = groupedOrders(ordersDone, 10, 'done');
    const pendingOrders = groupedOrders(ordersDone, 10, 'pending');

    return (
        <div className={`${styles.feedLayout}`}>
            <div className={`${styles.feedHeader} text_type_main-large mb-5`}>Лента заказов</div>
            <section className={`${styles.feed}`}>
                <section className={`${styles.orders} mr-15 mt-5`}>
                    {ordersDone.map((order : IOrder, index: number) => {
                        const ingredientsBurgers = getIngredientsFromIds(order.ingredients);
                        return (
                            <CardOrder key={index} title={order.name} id={order.number} createdAt={order.createdAt} ingredientsBurgers={ingredientsBurgers} />
                        );
                    })}
                </section>

                <section className={`${styles.feedStats}`}>
                    <article className={`${styles.boards}`}>
                        <Board title='Готовы:' groupedOrders={completedOrders} className='' />
                        <Board title='В ожидании:' groupedOrders={pendingOrders} className='' />
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