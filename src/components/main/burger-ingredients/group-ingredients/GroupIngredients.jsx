import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IngredientItems } from "./items/IngredientsItems";
import { ingredientType } from "../../../../utils/types";
import styles from '../../../main/burger-ingredients/BurgerIngredients.module.scss';


export function GroupIngredients({ ingredients }) {

    return (
        <>
            <section className={`${styles.burgerIngredients__group} mt-6 mb-10`}>
                {ingredients.length === 0 ? (
                    <p>Нет доступных ингредиентов.</p>
                ) : (
                    ingredients.map((ingredient) => (
                        <IngredientItems
                            key={ingredient.uniqueId}
                            ingredients={ingredient}              
                        />
                    ))
                )}
            </section>

        </>
    );
}

GroupIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType)
};