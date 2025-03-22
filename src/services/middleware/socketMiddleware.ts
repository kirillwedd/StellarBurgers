import { Middleware, MiddlewareAPI } from "redux";
import { AppActions } from "../reducer/types/actions";
import { AppDispatch, RootState, TWSStoreActions } from "../store";
import { getCurrentTimestamp } from "../../apiConfig";
import { IApiResponse } from "../reducer/types/wsTypes";


export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return next => (action: AppActions) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        const { user } = getState().users;
        if (type === wsInit && user) {
          socket = new WebSocket(`wss://norma.nomoreparties.space/api/orders/${wsUrl}`); 
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData: IApiResponse = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: getCurrentTimestamp() } });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
  
          if (type === wsSendMessage) {
            const payload = action.payload;
            const message: IMessage = {
              timestamp: Date.now(), // Добавляем текущее время в миллисекундах
              orders: payload.orders || [], // Предполагаем, что orders передаются через payload
              total: payload.total || 0, // Если total не указан, устанавливаем по умолчанию 0
              totalToday: payload.totalToday || 0 // Если totalToday не указан, устанавливаем по умолчанию 0
          };
            socket.send(JSON.stringify(message))
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };