import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import statusOrder  from '../../../../images/done.webp'
import styles from '../Modal.module.scss'
import PropTypes from 'prop-types';
export function OrderDetails({numberOrder}){
    return (
         <article className={`${styles.modal__information} ${styles.informationOrder}`}>
             <h1 className={`${styles.informationOrder__orderNumber} text text_type_digits-large`}>{numberOrder}</h1>
             <h2 className={`${styles.informationOrder__orderId} text_color_primary text_type_main-medium mt-8`}>Идентификатор заказа</h2>
             <div className={`${styles.informationOrder__orderStatus} mt-15`}>
                <img className={styles.informationOrder__orderImage} src={statusOrder} alt="" />
             </div>
             <div className={`${styles.informationOrder__textOrderInform} text_color_primary text_type_main-default mt-15`}>Ваш заказ начали готовить</div>
             <div className={`${styles.informationOrder__textExpactation} text_color_inactive text_type_main-default mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</div>
         </article>
    )
}


OrderDetails.propTypes={
   number: PropTypes.string
}