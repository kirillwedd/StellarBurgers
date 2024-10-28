import { Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import '../burger-constructor/BurgerConstructor.scss'
import '../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import '../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import { ModalOverlay } from "../../../modal/ModalOverlay";
import { OrderDetails} from '../../../../components/modal/detail/OrderDetails'
import { useState } from "react";
import PropTypes from 'prop-types';

export function BurgerConstructor({ingredientsConstructor}){

  const [isShowModalOrder, setShowModalOrder] = useState(false)

  const handleOrderClick = () => {
    setShowModalOrder(true); 
  };

  const handleCloseModal = () => {
    setShowModalOrder(false);
  };

    return (
        <>
        <div className="burger-constructror">
        <section className="burger-constructor__ingredients custom-scroll mt-25"> 
          {ingredientsConstructor.map((ingredients, index)=>(
              <article className="burger-constructor__ingredient mb-4">
              
              {ingredients.type !== 'bun' && <DragIcon />}
              <ConstructorElement  key={index} thumbnail={ingredients.image} 
              price={ingredients.price} extraClass={ingredients.type==='bun' ? 'ml-8 ' : 'ml-2'}
              isLocked={ingredients.type==='bun' ? true : false }
              text={ingredients.name} />
              </article>
            ))}
        </section>
          <div className="burger-constructor__info-price mt-10 mr-4">
            <div className="burger-constructor__price text_type_digits-medium  mr-10">610<CurrencyIcon/></div>
           <Button onClick={handleOrderClick}>Оформить заказ</Button>
          </div>
        </div>
        {isShowModalOrder && 
          <ModalOverlay  content={<OrderDetails />} onClose={handleCloseModal}/>
        }
        </>
    )
}

BurgerConstructor.propTypes={
  ingredientsConstructort:PropTypes.arrayOf(
    PropTypes.shape(
      {
        src:PropTypes.string,
        name:PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        __v:PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large:PropTypes.string

      }
    )
  )
}
