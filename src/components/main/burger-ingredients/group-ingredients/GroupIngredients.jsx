import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IngredientItems } from "./items/IngredientsItems";
import { clearDetailsIngredient, setDetailsIngredient } from '../../../../services/action/detailsIngredients';
import { ingredientType } from "../../../../utils/types";
import styles from '../../../main/burger-ingredients/BurgerIngredients.module.scss'
import { useState } from 'react';
import { Modal } from "../../../modal/Modal";
import { IngredientsDetails } from "../../../modal/detail/IngredientsDetails";

export function GroupIngredients({ ingredients }) {
    const dispatch = useDispatch();
    const selectedIngredient = useSelector((state) => state.details.selectedIngredient);
    const [isShowModal, setShowModal] = useState(false);
    
    const handleIngredientClick = (ingredient) => {
        dispatch(setDetailsIngredient(ingredient));
        setShowModal(true);
    };

    const handleCloseModal = () => {
        dispatch(clearDetailsIngredient());
        setShowModal(false);
    };

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
                            onClick={() => handleIngredientClick(ingredient)}
                        />
                    ))
                )}
            </section>

            {isShowModal && (
                <Modal modalTitle={"Детали ингредиента"} onClose={handleCloseModal}>
                    <IngredientsDetails ingredient={selectedIngredient || {}} />
                </Modal>
            )}
        </>
    );
}

GroupIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType)
};

