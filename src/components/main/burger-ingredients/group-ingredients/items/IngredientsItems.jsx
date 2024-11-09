import { Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";



export function IngredientItems({ onClick, ingredients }){
    const {_id, name, price, image, type}=ingredients
    
    const { ingredientsBurger, bun} = useSelector((state) => state.builderBurger);
    const countIngredients = (ingredientId, type) => {
        if (type === "bun") {
            if (bun && typeof bun === 'object') {
                return bun._id === ingredientId ? 2 : 0; 
            }
            
        }
        return ingredientsBurger.filter(ingredient => ingredient._id === ingredientId).length;
    };
    const [, drag] = useDrag({
        type: "ingredient",
        item: {price, image, name, _id, type },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

    return (
        <article className="burger-item__counter" ref={drag} >
            <Counter count={countIngredients(_id, type)}/> 
        <article  className="burger-ingredients__item burger-item" onClick={onClick}>
            <img src={image} alt={name} className="burger-item__image ml-4 mr-4" />
            <div className="burger-item__price text_type_digits-default mt-1">{price} < CurrencyIcon className="ml-2"/></div>
            <div className="burger-item__title text_type_main-default mt-1">{name}</div>    
        </article>
        </article>
        
    )
}

IngredientItems.propTypes={
    src: ingredientType,
    alt: ingredientType,
    price: ingredientType.isRequired,
    title: ingredientType.isRequired,
    onClick: PropTypes.func,

}