import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";

export const DragIngredient = ({ ingredient, index, moveIngredient, removeIngredient }) => {
    const ref =useRef();
    const [{ isDragging }, drag] = useDrag({
        type: "ingredient",
        item: ()=>{
            return {index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "ingredient",
        hover:(item, monitor)=> { 
            const dragIndex=item.index;
            const hoverIndex=index;

            if(dragIndex===hoverIndex){
                return;
            }

            if(!ref.current){
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if(item.index < index && hoverClientY < hoverMiddleY){
                return;
            }

            if(item.index > index && hoverClientY> hoverMiddleY){
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index=hoverIndex;
                
            
        },
    });
    drag(drop(ref));


    return (
        <article ref={ref} className={`burger-constructor__ingredient mb-4 ${isDragging ? 'dragging' : ''}`}>
            <DragIcon />
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

DragIngredient.propTypes = {
    ingredient: PropTypes.arrayOf(ingredientType).isRequired,
    index: PropTypes.number,
    moveIngredient: PropTypes.func,
    removeIngredient: PropTypes.func

};