import { API_URL } from "../../apiConfig";
import { request } from "../../utils/apiUtils";



export const ORDER_PLACE_REQUEST = 'ORDER_PLACE_REQUEST';
export const ORDER_PLACE_SUCCESS = 'ORDER_PLACE_SUCCESS';
export const ORDER_PLACE_FAIL = 'ORDER_PLACE_FAIL';

interface PlaceOrderSuccessAction {
    type: typeof ORDER_PLACE_SUCCESS;
    orderNumber: number;
    ingredientsOrder: string[];
}

interface PlaceOrderRequestAction {
    type: typeof ORDER_PLACE_REQUEST;
}

interface PlaceOrderFailAction {
    type: typeof ORDER_PLACE_FAIL;
    error: string;
}

export type OrderActions = PlaceOrderRequestAction | PlaceOrderSuccessAction | PlaceOrderFailAction;

export const placeOrderRequest = (): PlaceOrderRequestAction => ({
    type: ORDER_PLACE_REQUEST
});


export const placeOrderSuccess = (orderNumber : number , ingredients: string[]): PlaceOrderSuccessAction => ({
    type: ORDER_PLACE_SUCCESS,
    orderNumber,
    ingredientsOrder: ingredients
});

export const placeOrderFail = (error: string) : PlaceOrderFailAction => ({
    type: ORDER_PLACE_FAIL,
    error
});


