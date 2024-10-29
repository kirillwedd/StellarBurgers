import { useState } from "react";
import { IngredientItems } from "./items/IngredientsItems";
import { Modal } from "../../../modal/Modal";
import { IngredientsDetails } from "../../../modal/detail/IngredientsDetails";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../utils/types";

export function GroupIngredients({ingredients}) {
    const [isShowModal, setShowModal] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState(null);
   

    const handleIngredientClick = (ingredient) => {
        setSelectedIngredient(ingredient);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedIngredient(null);
        setShowModal(false);
    };

    return (
        <>
        <section className="burger-ingredients__group mt-6 mb-10">
            {
                ingredients.map((ingredient)=>(
                    <IngredientItems key={ingredient._id} title={ingredient.name}
                                     price={ingredient.price} src={ingredient.image}
                                     onClick={()=>handleIngredientClick(ingredient)}
                    />      
                ))
            }
        </section>

        {isShowModal && (
                <Modal modalTitle={"Детали ингредиента"} onClose={handleCloseModal}>
                    <IngredientsDetails ingredient={selectedIngredient}/>
                </Modal>
            )}
        </>
    )
}

GroupIngredients.propTypes={
    ingredients:PropTypes.arrayOf(ingredientType)      
}