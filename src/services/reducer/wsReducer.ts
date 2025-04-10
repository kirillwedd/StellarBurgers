import { getCurrentTimestamp } from "../../apiConfig";
import { TWSActions } from "./types/ingredientTypes";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_GET_MESSAGE_POPUP } from "./types/wsActions";
import {  IOrder } from "./types/wsTypes";

  
type TWSState = {
  wsConnected: boolean;
  order: IOrder | null;
  orders: IOrder[]; 
  total: number | null; 
  totalToday: number | null; 
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  orders: [],  
  total: null,
  totalToday: null,
  order: null
};
  
  export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        const { orders, total, totalToday } = action.payload;
        return {
          ...state,
          error: undefined,
          orders: orders || [], 
          total: total || 0, 
          totalToday: totalToday || 0, 
         
        };

      case WS_GET_MESSAGE_POPUP: 
          const {order}=action.payload;
          return{
            ...state,
            order: order
          }
      

  
      default:
        return state;
    }
  };