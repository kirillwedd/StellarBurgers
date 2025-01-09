import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IngredientItems } from "./items/IngredientsItems";
import { ingredientType } from "../../../../utils/types";
import styles from '../../../main/burger-ingredients/BurgerIngredients.module.scss';
import { Ingredient } from '../../../../services/reducer/types/reducerTypes';

export interface IIngredients {
    ingredients:Array<Ingredient>
}

export function GroupIngredients({ ingredients}: IIngredients ) {

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
                            _id={ingredient._id}
                            image={ingredient.image}
                            type={ingredient.type}
                            name={ingredient.name}
                            price={ingredient.price}

                        />
                    ))
                )}
            </section>

        </>
    );
}

