import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import '../burger-constructor/BurgerConstructor.scss';
import { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../utils/types";
import { SelectedIngredient } from "./SelectIngredient";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, replaceBun, moveIngredient } from "../../../../services/action/builderBurger";
import { placeOrderFail, placeOrderRequest, placeOrderSuccess } from "../../../../services/action/order";
import { Modal } from "../../../modal/Modal";
import { OrderDetails } from "../../../modal/detail/OrderDetails";
import { DragIngredient } from "./drag-ingredient/DragIngredient";

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
    };

    const placeOrder = () => {
        dispatch(placeOrderRequest());
        const orderData = {
            ingredients: [
                bun ? bun._id : null,
                ...ingredientsBurger.map(ingredient => ingredient._id),
                bun ? bun._id : null
            ]
        };

        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила некорректно');
                }
                return response.json();
            })
            .then(data => {
                setOrderNumber(data.order.number);
                dispatch(placeOrderSuccess(data.order.number, orderData.ingredients));
                handleOrderClick();
            })
            .catch(err => {
                dispatch(placeOrderFail(err.message));
            });
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

    const [, dropBun] = useDrop({
        accept: "ingredient",
        drop(item) {
            if (item.type === 'bun') {
                dispatch(replaceBun(item)); 
            }
        },
    });

    const [, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            if (item.type !== 'bun') {
                const { index, ...ingredientsBurger } = item
                dispatch(addIngredient(ingredientsBurger));
            }
        },
    });

    return (
        <div className="burger-constructor">
            <section className="mt-25" ref={dropBun}>
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

                <section ref={drop} className="burger-constructor__ingredients">
                    {ingredientsBurger.length > 0 ? (
                        ingredientsBurger.map((ingredient, index) => (
                            <DragIngredient 
                                key={ingredient._id} 
                                ingredient={ingredient} 
                                index={index} 
                                moveIngredient={moveIngredients} 
                                removeIngredient={() => dispatch(removeIngredient(ingredient._id))}
                            />
                        ))
                    ) : (
                        <SelectedIngredient extraClass={"mb-4"} type="middle">
                            Выберите начинку
                        </SelectedIngredient>
                    )}
                </section>

                {bun ? (
                    <article className="burger-constructor__ingredient mb-4" key={bun._id}>
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
                <Button onClick={placeOrder} disabled={ingredientsBurger.length === 0}>Оформить заказ</Button>
            </div>

            {isShowModalOrder && 
            <Modal onClose={handleCloseModal}>
                <OrderDetails numberOrder={orderNumber} />
            </Modal>
            }
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredientsBurger: PropTypes.arrayOf(ingredientType).isRequired,
};