import { Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import '../burger-constructor/BurgerConstructor.scss'
import '../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import '../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import { ModalOverlay } from "../../../modal/ModalOverlay";
import { OrderDetails} from '../../../../components/modal/detail/OrderDetails'
import { useState } from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../utils/types";
import { Bun } from "./bun/Bun";
import { Modal } from "../../../modal/Modal";

export function BurgerConstructor({ingredientsConstructor}){

  const [isShowModalOrder, setShowModalOrder] = useState(false)

  const handleOrderClick = () => {
    setShowModalOrder(true); 
  };

  const handleCloseModal = () => {
    setShowModalOrder(false);
  };

  const firstBun = ingredientsConstructor.find(ingredient => ingredient.type === 'bun');
  const upperBun = firstBun ? firstBun : null;
  const lowerBun = upperBun ? { ...upperBun } : null; 
  const otherIngredients = ingredientsConstructor.filter(ingredient => ingredient.type !== 'bun');

    return (
        <>
     <div className="burger-constructror">
      <section className="mt-25">
        {upperBun && (<Bun bun={upperBun} type="top" extraClass={"mb-4"}/>)}
        <section className="burger-constructor__ingredients custom-scroll"> 
          {otherIngredients.map((ingredients)=>(
            <article className="burger-constructor__ingredient mb-4"  key={ingredients._id}>          
              <DragIcon />
              <ConstructorElement  thumbnail={ingredients.image} 
              price={ingredients.price} extraClass={ingredients.type==='bun' ? 'ml-8 ' : 'ml-2'}
              isLocked={ingredients.type==='bun' ? true : false }
              text={ingredients.name} />
              </article>
            ))}
        </section>
          {lowerBun && (<Bun bun={upperBun} type="bottom"/>)}
      </section>
          <div className="burger-constructor__info-price mt-10 mr-4">
            <div className="burger-constructor__price text_type_digits-medium  mr-10">610<CurrencyIcon/></div>
           <Button onClick={handleOrderClick}>Оформить заказ</Button>
          </div>
        </div>
        {isShowModalOrder && 
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        }
        </>
    )
}

BurgerConstructor.propTypes={
  ingredientsConstructort:PropTypes.arrayOf(ingredientType)
}
