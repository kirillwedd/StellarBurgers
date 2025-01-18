import { useEffect, useState } from 'react'
import { CardOrder } from '../items-pages/CardOrder'
import { IngredientPreview } from '../items-pages/IngredientPreview'
import styles from '../pages/Feed.module.scss'
import { ORDER_SOCKET_URL } from '../../../apiConfig'
import { Board } from '../items-pages/Board'

export interface IOrder {
    ingredients: string[]; 
    _id: string;  
    status: string; 
    number: number; 
    createdAt: string;
    updatedAt: string; 
}

// Интерфейс для ответа от API
interface IApiResponse {
    success: boolean; 
    orders: IOrder[] | undefined; 
    total: number;   
    totalToday: number;    
}

export function Feed(){

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);
    

    const groupedOrders = (status: string) => {
        return orders.filter((order: IOrder) => order.status === status);
    };

    useEffect(()=>{
        const socket=new WebSocket(ORDER_SOCKET_URL);

        socket.onopen=()=>{
            console.log('WebSocket подключен')
        }

        socket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
        };

        socket.onmessage=(event)=>{
            const data: IApiResponse=JSON.parse(event.data)

            if(data.success){
                setOrders(data.orders || [] );
                setTotal(data.total);
                setTotalToday(data.totalToday);
            }
        }
    }, [])
    
    return(
        <div className={`${styles.feedLayout}`}>
        <div className={`${styles.feedHeader} text_type_main-large mb-5`}>Лента заказов</div>
        <section className={`${styles.feed}`}>
            <section className={`${styles.orders} mr-15 mt-5`}>

                <CardOrder id={550}/>

            </section>

            <section className={`${styles.feedStats}`}>

               <article className={`${styles.board}`}>
                <Board title='Готовы:' groupedOrders={groupedOrders('done')}/>
                <Board title='В работе:' groupedOrders={groupedOrders("")} className="ml-9" />
               </article>
               <article className={`${styles.board}  mt-15`}>
               <div className={`text_type_main-medium ${styles.board__titleCompleted}`}>Выполнено за все время:</div>
               <div className={` ${styles.board__completed} text_type_digits-large`}>{total}</div>
               </article>

               <article className={`${styles.board}  mt-15`}>
               <div className={`text_type_main-medium ${styles.board__titleCompleted}`}>Выполнено за сегодня:</div>
               <div className={` ${styles.board__completed} text_type_digits-large`}>{totalToday}</div>
               </article>

            </section>
        </section>
        </div>
    )
}


