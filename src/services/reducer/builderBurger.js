import { ADD_BUILDER_BURGER_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../action/builderBurger";
import { REPLACE_BUN } from "../action/builderBurger";

const initialState = {
    ingredientsBurger: [],
    bun:null
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUILDER_BURGER_INGREDIENT: 
    return { 
        ...state, 
        ingredientsBurger: [...state.ingredientsBurger, action.ingredient]  
    }
     case REPLACE_BUN:
        return {
            ...state,
            bun: action.bun,
        }
     case REMOVE_INGREDIENT:
        return {
            ...state,
            ingredientsBurger: state.ingredientsBurger.filter(ingredient => ingredient._id !== action.payload.id)
        
        }
        case MOVE_INGREDIENT:
            const { dragIndex, hoverIndex } = action.payload;
            const newIngredients = [...state.ingredientsBurger];

            const [movedIngredient] = newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, movedIngredient);

            return {
                ...state,
                ingredientsBurger: newIngredients,
            };
        default:
            return state;
    }
};