import { ADD_INGREDIENT, SET_LOADING, SET_ERROR, TAB_SWITCH } from "../action/burgerIngredients";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { burgerConstructorReducer } from "./builderBurger";
import { detailsingredientReducer } from "./detailsIngredients";
import { orderReducer } from "./order";
import { thunk } from "redux-thunk";


const initialState = {
    ingredients: [],
    loading: true,
    error: null,
    activeTab: ''
  };

export const burgerIngredientsReducer=(state=initialState, action)=>{
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

const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    builderBurger: burgerConstructorReducer,
    details: detailsingredientReducer,
    order: orderReducer
  });

  const composedEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
);

export const store = createStore(
  rootReducer,
  composedEnhancers
);