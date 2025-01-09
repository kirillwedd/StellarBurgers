import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../burger-constructor/BurgerConstructor.module.scss';
import { useEffect, useMemo, useState } from "react";
import { SelectedIngredient } from "./SelectIngredient";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, replaceBun, moveIngredient } from "../../../../services/action/builderBurger";
import { Modal } from "../../../modal/Modal";
import { OrderDetails } from "../../../modal/detail/OrderDetails";
import { v4 as uuidv4 } from 'uuid';
import { placeOrderThunk } from "../../../../services/action/thunk/orderActions";
import { useNavigate } from "react-router-dom";
import { setAuthorized } from "../../../../services/action/user";
import { DragIngredient } from "./drag-ingredient/DragIngredient";
import { Ingredient } from "../../../../services/reducer/types/reducerTypes";
import { RootState } from "../../../../services/store";
import { OrderData } from "../../../../services/reducer/types/orderTypes";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";

export function BurgerConstructor() {
    
    const dispatch = useAppDispatch();
    const { ingredientsBurger, bun } = useAppSelector((state) => state.builderBurger);
    const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
    const [isShowModalOrder, setShowModalOrder] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const navigate=useNavigate();

  

  
   
    
    const handleOrderClick = () => {
        setShowModalOrder(true);
    };

    const handleCloseModal = () => {
        setShowModalOrder(false);
        setOrderNumber(null); 
    };

    const placeOrder = async () => {
        
        if(!isLoggedIn)  
        {
                navigate('/login');
        }
        else 
        {   
        const orderData : OrderData= {
            ingredients: [
                bun ? bun._id : "",
                ...ingredientsBurger.map(ingredient => ingredient._id),
                bun ? bun._id : "",
            ] 
        };

        try {
            const orderNumber = await dispatch(placeOrderThunk(orderData)); 
            setOrderNumber(orderNumber); 
            handleOrderClick(); 
        } catch (err) {
            console.error(err); 
        }
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

    const moveIngredients = (fromIndex : number, toIndex: number) => {
        dispatch(moveIngredient(fromIndex, toIndex));
    };
    
    const [{ isOver }, drop] = useDrop<Ingredient, void, { isOver: boolean }>({
        accept: 'ingredient',
        drop(item: Ingredient) {
            if (item.type === 'bun') {
                
                dispatch(replaceBun(item));
            } else {
                
                const ingredientWithId: Ingredient = {
                    ...item,
                    uniqueId: uuidv4()
                };
                dispatch(addIngredient(ingredientWithId));
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div className={styles.burgerConstructor}>
            <section className="mt-25" ref={drop}>
                {bun ? (
                    <article className={`${styles.burgerConstructor__ingredient} mb-4`} key={bun._id}>
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

                <section className={styles.burgerConstructor__ingredients}>
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
                    <article className={`${styles.burgerConstructor__ingredient} mb-4`} key={bun.uniqueId}>
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

            <div className={`${styles.burgerConstructor__infoPrice} mt-10 mr-4`}>
                <div className={`${styles.burgerConstructor__price} text_type_digits-medium mr-10`}>{totalPrice}<CurrencyIcon type="primary" /></div>
                <Button htmlType="submit" onClick={placeOrder} disabled={ingredientsBurger.length === 0 || !bun}>Оформить заказ</Button>
            </div>

            {isShowModalOrder && 
            <Modal onClose={handleCloseModal}>
                <OrderDetails numberOrder={orderNumber} />
            </Modal>
            }
        </div>
    );
}

