import { useState } from "react";
import { IngredientItems } from "./items/IngredientsItems";
import { ModalOverlay } from "../../../modal/ModalOverlay";
import { IngredientsDetails } from "../../../modal/detail/IngredientsDetails";
import PropTypes from 'prop-types';

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
                ingredients.map((ingredients, index)=>(
                    <IngredientItems key={index} title={ingredients.name}
                                     price={ingredients.price} src={ingredients.image}
                                     onClick={()=>handleIngredientClick(ingredients)}
                    />      
                ))
            }
        </section>

        {isShowModal && 
        <ModalOverlay  content={<IngredientsDetails  ingredient={selectedIngredient}/>}
         isShowModal={isShowModal} onClose={handleCloseModal}/>
        }
        </>
    )
}

GroupIngredients.propTypes={
    ingredient:PropTypes.arrayOf(
        PropTypes.shape(
          {
            src:PropTypes.string,
            name:PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            _id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            __v:PropTypes.number.isRequired,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large:PropTypes.string
          }
        )
      )
}