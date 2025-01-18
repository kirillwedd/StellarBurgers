import styles from '../items-pages/Board.module.scss'
import { IOrder } from '../pages/Feed'

interface IBoard {
    title: string
    groupedOrders: IOrder[]
    className: string
}

export function Board({title, groupedOrders, className}: IBoard){
    return (
        <article className={`${styles.board} ${className} `}>
            <div className={`${styles.title} text_type_main-medium`}>{title}</div>
            <ul className={`${styles.orderReadiness} mt-6`}>
                
                {
                   
                   groupedOrders.slice(0, 10).map(order=>(<li className={`${title==="Готовы:" ? styles.ready : styles.working} text_type_digits-default mt-2`}>{order.number}</li>))
                   

                }
            </ul>

        </article>
    )
}