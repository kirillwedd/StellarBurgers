import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { burgerConstructorReducer } from './reducer/builderBurger';
import { detailsingredientReducer } from './reducer/detailsIngredients';
import { orderReducer } from './reducer/order';
import { burgerIngredientsReducer } from './reducer/burgerIngredients';
import { userReducer } from './reducer/user';

const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    builderBurger: burgerConstructorReducer,
    details: detailsingredientReducer,
    order: orderReducer,
    users: userReducer
  });


const composedEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
);


export const store = createStore(
    rootReducer,
    composedEnhancers
);

