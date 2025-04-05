import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import styles from '../../burger-constructor/BurgerConstructor.module.scss';
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import { Ingredient } from "../../../../../services/reducer/types/reducerTypes";

interface DragIngredientProps {
    ingredient: Ingredient; // Убедитесь, что ingredientType имеет правильный тип
    index: number;
    moveIngredient: (fromIndex: number, toIndex: number) => void;
    removeIngredient: (id: string) => void;
}

export const DragIngredient: React.FC<DragIngredientProps> = ({ ingredient, index, moveIngredient, removeIngredient }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag({
        type: "ingredient",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "ingredient",
        hover: (item: { index: number }, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            if (!ref.current) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) {
                return; // Добавляем проверку на null
            }

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex; // Обновляем индекс элемента
        },
    });

    drag(drop(ref));

    return (
        <article  ref={ref} data-testid={"ingredient-643d69a5c3f7b9001cfa0941"}  className={`${styles.burgerConstructor__ingredient} mb-4 ${isDragging ? 'dragging' : ''}`}>
            <DragIcon type="primary" />
            <ConstructorElement 
                thumbnail={ingredient.image}
                price={ingredient.price}
                extraClass={'ml-2'}
                isLocked={false}
                text={ingredient.name}
                handleClose={() => removeIngredient(ingredient._id)}
            />
        </article>
    );
};