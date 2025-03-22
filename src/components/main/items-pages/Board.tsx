import { IOrder } from '../../../services/reducer/types/wsTypes'
import styles from '../items-pages/Board.module.scss'

interface IBoard {
    title: string
    groupedOrders: IOrder[]
    className: string
}

export function Board({title, groupedOrders, className}: IBoard){
    return (
        <article className={`${styles.board} ${className} `}>
            <div className={`${styles.title} text_type_main-medium`}>{title}</div>
            <div className={`${styles.orderReadiness} mt-6`}>
                
                {
                   
                   groupedOrders.slice(0, 10).map(order=>(<div key={order._id} className={`${title==="Готовы:" ? styles.ready : styles.working} text_type_digits-default mt-2`}>{order.number}</div>))
                   

                }
            </div>

        </article>
    )
}