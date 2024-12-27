import { createStore, applyMiddleware, combineReducers, compose, StoreEnhancer, Action } from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import { burgerConstructorReducer } from './reducer/builderBurger';
import { orderReducer } from './reducer/order';
import { userReducer } from './reducer/user';
import { burgerIngredientsReducer } from './reducer/burgerIngredients';
import { UserActions } from './action/user';
import { BurgerActions } from './action/builderBurger';
import { AppActions } from './reducer/types/actions';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  builderBurger: burgerConstructorReducer,
  order: orderReducer,
  users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
const composedEnhancers = compose(
  applyMiddleware(thunk),
  (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

//@ts-ignore
export const store = createStore(rootReducer, composedEnhancers);