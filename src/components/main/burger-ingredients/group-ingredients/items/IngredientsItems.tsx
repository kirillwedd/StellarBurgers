import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import { useDrag } from "react-dnd";
import styles from '../../../burger-ingredients/BurgerIngredients.module.scss'
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { Link, useLocation } from "react-router-dom";
import { Ingredient } from "../../../../../services/reducer/types/reducerTypes";
import { useAppSelector } from "../../../../../services/hooks";

export interface IIngredientWithClick extends Pick<Ingredient, '_id' | 'name' | 'price' | 'image' | 'type'> {
    onClick?: () => void; 
    ingredients: Ingredient
}

export function IngredientItems({ onClick, ingredients, _id, name, price, image, type, } : IIngredientWithClick) {
   
    const location =useLocation();

    const { ingredientsBurger, bun } = useAppSelector((state ) => state.builderBurger);
    
    const countIngredients = (ingredientId : string, type: string) => {
       
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
        <Link to={`/ingredients/${_id}`} state={{ background: location }}  className={styles.link}  >
        <article className={styles.burgerItem__counter} ref={drag}>
            <Counter count={countIngredients(_id, type)} /> 
            <article className={`${styles.burgerIngredients__item} ${styles.burgerItem}`} data-testid="burger-item"  onClick={onClick}>
                <img src={image} alt={name} className={`${styles.burgerItem__image} ml-4 mr-4`} />
                <div className={`${styles.burgerItem__price} text_type_digits-default mt-1`}>
                    {price} <CurrencyIcon type="primary" className="ml-2"/>
                </div>
                <div className={`${styles.burgerItem__title} text_type_main-default mt-1`}>{name}</div>    
            </article>
        </article>
        </Link>
    );
}

