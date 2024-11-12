import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import { useDrag } from "react-dnd";
import styles from '../../../burger-ingredients/BurgerIngredients.module.scss'
import { useSelector } from "react-redux";
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';

export function IngredientItems({ onClick, ingredients }) {
    const { _id, name, price, image, type} = ingredients;

    const { ingredientsBurger, bun } = useSelector((state) => state.builderBurger);
    
    const countIngredients = (ingredientId, type) => {
       
        if (type === "bun" && bun && bun._id === ingredientId) {
            return 2;
        }
        
       
        return ingredientsBurger.filter(ingredient => ingredient._id === ingredientId).length;
    };

    const [, drag] = useDrag({
        type: "ingredient",
        item: { ...ingredients},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <article className={styles.burgerItem__counter} ref={drag}>
            <Counter count={countIngredients(_id, type)} /> 
            <article className={`${styles.burgerIngredients__item} ${styles.burgerItem}`} onClick={onClick}>
                <img src={image} alt={name} className={`${styles.burgerItem__image} ml-4 mr-4`} />
                <div className={`${styles.burgerItem__price} text_type_digits-default mt-1`}>
                    {price} <CurrencyIcon className="ml-2"/>
                </div>
                <div className={`${styles.burgerItem__title} text_type_main-default mt-1`}>{name}</div>    
            </article>
        </article>
    );
}

IngredientItems.propTypes = {
    ingredients: ingredientType.isRequired,
    onClick: PropTypes.func,
};