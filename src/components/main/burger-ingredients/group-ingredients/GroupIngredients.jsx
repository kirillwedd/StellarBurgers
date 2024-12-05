import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IngredientItems } from "./items/IngredientsItems";
import { ingredientType } from "../../../../utils/types";
import styles from '../../../main/burger-ingredients/BurgerIngredients.module.scss';
import { useEffect, useState } from 'react';
import { Modal } from "../../../modal/Modal";
import { IngredientsDetails } from "../../../modal/detail/IngredientsDetails";
import { useNavigate, useParams } from 'react-router-dom';

export function GroupIngredients({ ingredients }) {
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isShowModal, setShowModal] = useState(false);
    const { _id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (_id) {
            const ingredient = ingredients.find(ingredient => ingredient._id === _id);
            if (ingredient) {
                setSelectedIngredient(ingredient);
                setShowModal(true);
            } else {
                navigate('/'); 
            }
        }
    }, [_id, ingredients, navigate]);

    const handleIngredientClick = (ingredient) => {
        setSelectedIngredient(ingredient);
        setShowModal(true)
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedIngredient(null);
        navigate('/'); 
    };

    useEffect(() => {
        if (isShowModal) {
            const handlePopState = () => {
                setShowModal(false);
            };

            window.addEventListener('popstate', handlePopState);
            return () => window.removeEventListener('popstate', handlePopState);
        }
    }, [isShowModal]);

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
                    <IngredientsDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </>
    );
}

GroupIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType)
};