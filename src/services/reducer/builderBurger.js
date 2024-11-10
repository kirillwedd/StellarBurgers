import { ADD_BUILDER_BURGER_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../action/builderBurger";
import { REPLACE_BUN } from "../action/builderBurger";

const initialState = {
    ingredientsBurger: [],
    bun:null,
    
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUILDER_BURGER_INGREDIENT: 
        if (!action.ingredient || !action.ingredient._id) {
            
            return state; 
        }
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
            ingredientsBurger: state.ingredientsBurger.filter(ingredient => ingredient.uniqueId !== action.payload.id)
        
        }
        case MOVE_INGREDIENT: {
            const { fromIndex, toIndex } = action;
            if (fromIndex === toIndex) return state; 
        
            const updatedIngredients = [...state.ingredientsBurger];
            const [movedIngredient] = updatedIngredients.splice(fromIndex, 1); 
            updatedIngredients.splice(toIndex, 0, movedIngredient); 
        
            return {
                ...state,
                ingredientsBurger: updatedIngredients,
            };
        }
        default:
            return state;
    }
};