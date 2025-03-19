import { createStore, applyMiddleware, combineReducers, compose, } from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import { burgerConstructorReducer } from './reducer/builderBurger';
import { orderReducer } from './reducer/order';
import { userReducer } from './reducer/user';
import { burgerIngredientsReducer } from './reducer/burgerIngredients';
import { AppActions } from './reducer/types/actions';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from './reducer/types/wsActions';
import { wsReducer } from './reducer/wsReducer';
import { socketMiddleware } from './middleware/socketMiddleware';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  builderBurger: burgerConstructorReducer,
  order: orderReducer,
  users: userReducer,
  ws: wsReducer
});

export type TWSStoreActions = {
  wsInit: typeof  WS_CONNECTION_START,
  wsSendMessage: typeof  WS_SEND_MESSAGE,
  onOpen: typeof  WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof  WS_CONNECTION_ERROR,
  onMessage: typeof  WS_GET_MESSAGE,
};

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
const composedEnhancers = compose(
  (applyMiddleware(thunk, socketMiddleware('wss://norma.nomoreparties.space/orders', wsActions))),
  (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

//@ts-ignore
export const store = createStore(rootReducer, composedEnhancers);