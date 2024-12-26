import { ADD_INGREDIENT, SET_LOADING, SET_ERROR, TAB_SWITCH, AppActions } from "../action/burgerIngredients";

import { BurgerIngredientsState } from "./types/reducerTypes";




const initialState : BurgerIngredientsState = {
    ingredients: [],
    loading: true,
    error: null,
    activeTab: 'bun'
  };

export const burgerIngredientsReducer=(state=initialState, action : AppActions): BurgerIngredientsState=>{
    switch(action.type){
        case ADD_INGREDIENT:
            return { ...state, ingredients: action.payload };
          case SET_LOADING:
            return { ...state, loading: action.payload };
          case SET_ERROR:
            return { ...state, error: action.payload };
          case TAB_SWITCH:
            return { ...state, activeTab: action.tabActive };
          default:
            return state;
    }

}

