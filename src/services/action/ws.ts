import { useCallback, useEffect, useRef } from 'react';
import { IOrder } from '../reducer/types/wsTypes';
import { AppActions } from '../reducer/types/actions';
import { Ingredient } from '../reducer/types/reducerTypes';
import { WS_GET_MESSAGE, WS_GET_MESSAGE_POPUP } from '../reducer/types/wsActions';

export const CONNECTING: 'CONNECTING' = 'CONNECTING';
export const OPEN: 'OPEN' = 'OPEN';
export const CLOSING: 'CLOSING' = 'CLOSING';
export const CLOSED: 'CLOSED' = 'CLOSED';


export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED
};

interface IWSOptions {
  onMessage: (event: MessageEvent<string>) => void
  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}


interface SetOrdersAction {
   type: typeof WS_GET_MESSAGE;
   payload: { orders: IOrder[] }
}

interface SetOrderPopUp {
  type: typeof WS_GET_MESSAGE_POPUP
  payload: { order: IOrder}
}


export const setOrders = (orders: IOrder[]) : SetOrdersAction => ({
  type:  WS_GET_MESSAGE,
  payload: {orders},
});

export const SetOrderPopUp=(order: IOrder):SetOrderPopUp=>({
  type: WS_GET_MESSAGE_POPUP,
  payload:{order}
})

export const useSocket = (url: string, options: IWSOptions) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (token: string) => {
      ws.current = new WebSocket(`${url}?token=${token}`);
      ws.current.onopen = (event: Event) => {
        if (typeof options.onConnect === 'function') {
          options.onConnect(event);
        }
      };

      ws.current.onclose = (event: Event) => {
        if (typeof options.onDisconnect === 'function') {
          options.onDisconnect(event);
        }
      };
    },
    [url, options]
  );

  useEffect(
    () => {
      if (ws.current) {
        ws.current.onmessage = options.onMessage;

        if (typeof options.onConnect === 'function') {
          ws.current.onopen = options.onConnect;
        }
        if (typeof options.onDisconnect === 'function') {
          ws.current.onclose = options.onDisconnect;
        }
        if(typeof options.onError==='function'){
            ws.current.onerror=options.onError
        }
      }
    },
    [options, ws]
  );

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === 'function') {
        ws.current.close();
      }
    };
  }, []);

  const sendData = useCallback(
    (message: object) => {
      if (ws.current) {
        ws.current.send(JSON.stringify(message))
      }
    },
    [ws]
  );

  return { connect, sendData };
};