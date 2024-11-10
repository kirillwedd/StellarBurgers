import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';

export function IngredientItems({ onClick, ingredients }) {
    const { _id, name, price, image, type } = ingredients;

    const { ingredientsBurger, bun } = useSelector((state) => state.builderBurger);
    
    const countIngredients = (ingredientId, type) => {
        // Если это булка, то возвращаем 2, если она совпадает с текущим ингредиентом
        if (type === "bun" && bun && bun._id === ingredientId) {
            return 2;
        }
        
        // Возвращаем количество остальных ингредиентов
        return ingredientsBurger.filter(ingredient => ingredient._id === ingredientId).length;
    };

    const [, drag] = useDrag({
        type: "ingredient",
        item: { price, image, name, _id, type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <article className="burger-item__counter" ref={drag}>
            <Counter count={countIngredients(_id, type)} /> 
            <article className="burger-ingredients__item burger-item" onClick={onClick}>
                <img src={image} alt={name} className="burger-item__image ml-4 mr-4" />
                <div className="burger-item__price text_type_digits-default mt-1">
                    {price} <CurrencyIcon className="ml-2"/>
                </div>
                <div className="burger-item__title text_type_main-default mt-1">{name}</div>    
            </article>
        </article>
    );
}

IngredientItems.propTypes = {
    ingredients: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
};