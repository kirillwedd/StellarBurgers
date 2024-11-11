import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import '../burger-constructor/BurgerConstructor.scss';
import { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../utils/types";
import { SelectedIngredient } from "./SelectIngredient";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, replaceBun, moveIngredient } from "../../../../services/action/builderBurger";
import { Modal } from "../../../modal/Modal";
import { OrderDetails } from "../../../modal/detail/OrderDetails";
import { v4 as uuidv4 } from 'uuid';
import { placeOrderThunk } from "../../../../services/action/order";
import { DragIngredient } from "./drag-ingredient/dragIngredient";

export function BurgerConstructor() {
    const dispatch = useDispatch();
    const { ingredientsBurger, bun } = useSelector((state) => state.builderBurger);
    const [isShowModalOrder, setShowModalOrder] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    
    const handleOrderClick = () => {
        setShowModalOrder(true);
    };

    const handleCloseModal = () => {
        setShowModalOrder(false);
        setOrderNumber(null); 
    };

    const placeOrder = async () => {
        const orderData = {
            ingredients: [
                bun ? bun._id : null,
                ...ingredientsBurger.map(ingredient => ingredient._id),
                bun ? bun._id : null,
            ] 
        };

        try {
            const orderNumber = await dispatch(placeOrderThunk(orderData)); 
            setOrderNumber(orderNumber); 
            handleOrderClick(); 
        } catch (err) {
            console.error(err); 
        }
    };

    const totalPrice = useMemo(() => {
        let price = 0;
        if (bun) {
            price += bun.price * 2;  
        }
        ingredientsBurger.forEach(ingredient => {
            price += ingredient.price; 
        });
        return price; 
    }, [bun, ingredientsBurger]);

    const moveIngredients = (fromIndex, toIndex) => {
        dispatch(moveIngredient(fromIndex, toIndex));
    };
    
    const [, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            if (item.type === 'bun') {
                dispatch(replaceBun(item));
            } else {
                const ingredientWithId = { ...item, uniqueId: uuidv4() };
                dispatch(addIngredient(ingredientWithId));
            }
        },
    });

    return (
        <div className="burger-constructor">
            <section className="mt-25" ref={drop}>
                {bun ? (
                    <article className="burger-constructor__ingredient mb-4" key={bun._id}>
                        <ConstructorElement
                            thumbnail={bun.image}
                            price={bun.price}
                            extraClass={'ml-8'}
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (вверх)`}
                        />
                    </article>
                ) : (
                    <SelectedIngredient extraClass={"mb-4"} type="top">
                        Выберите верхнюю булку
                    </SelectedIngredient>
                )}

                <section className="burger-constructor__ingredients">
                    {ingredientsBurger.length > 0 ? (
                        ingredientsBurger.map((ingredient, index) => (
                            <DragIngredient 
                                key={ingredient.uniqueId} 
                                ingredient={ingredient} 
                                index={index} 
                                moveIngredient={moveIngredients} 
                                removeIngredient={() => dispatch(removeIngredient(ingredient.uniqueId))}
                            />
                        ))
                    ) : (
                        <SelectedIngredient extraClass={"mb-4"} type="middle">
                            Выберите начинку
                        </SelectedIngredient>
                    )}
                </section>

                {bun ? (
                    <article className="burger-constructor__ingredient mb-4" key={bun.uniqueId}>
                        <ConstructorElement
                            thumbnail={bun.image}
                            price={bun.price}
                            extraClass={'ml-8'}
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            type="bottom"
                        />
                    </article>
                ) : (
                    <SelectedIngredient extraClass={"mb-4"} type="bottom">
                        Выберите нижнюю булку
                    </SelectedIngredient>
                )}
            </section>

            <div className="burger-constructor__info-price mt-10 mr-4">
                <div className="burger-constructor__price text_type_digits-medium mr-10">{totalPrice}<CurrencyIcon /></div>
                <Button onClick={placeOrder} disabled={ingredientsBurger.length === 0 || !bun}>Оформить заказ</Button>
            </div>

            {isShowModalOrder && 
            <Modal onClose={handleCloseModal}>
                <OrderDetails numberOrder={orderNumber} />
            </Modal>
            }
        </div>
    );
}

