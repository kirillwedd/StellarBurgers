import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import statusOrder  from '../../../../images/done.webp'
export function OrderDetails(){
    return (
         <article className="modal__information information-order">
             <h1 className='information-order__order-number text text_type_digits-large'>034536</h1>
             <h2 className='information-order__order-id text_color_primary text_type_main-medium mt-8'>Идентификатор заказа</h2>
             <div className='information-order__order-status mt-15'>
                <img className='information-order__order-image' src={statusOrder} alt="" />
             </div>
             <div className='information-order__text-order-inform text_color_primary text_type_main-default mt-15'>Ваш заказ начали готовить</div>
             <div className='information-order__text-expactation text_color_inactive text_type_main-default mt-2 mb-30'>Дождитесь готовности на орбитальной станции</div>
         </article>
    )
}

