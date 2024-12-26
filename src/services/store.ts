import { createStore, applyMiddleware, combineReducers, compose, StoreEnhancer, Action } from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import { burgerConstructorReducer } from './reducer/builderBurger';
import { orderReducer } from './reducer/order';
import { userReducer } from './reducer/user';
import { burgerIngredientsReducer } from './reducer/burgerIngredients';
import { UserActions } from './action/user';
import { BurgerActions } from './action/builderBurger';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  builderBurger: burgerConstructorReducer,
  order: orderReducer,
  users: userReducer,
});

// Определяем типы RootState и AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppDispatchIngredient = ThunkDispatch<RootState, unknown, Action<string>>;
export type AppDispatchUser = ThunkDispatch<RootState, unknown, UserActions>;
export type AppDispatchBurgerConstructor = ThunkDispatch<RootState, unknown, BurgerActions>;
const composedEnhancers = compose(
  applyMiddleware(thunk),
  (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

//@ts-ignore
export const store = createStore(rootReducer, composedEnhancers);