import { ORDER_PLACE_REQUEST, ORDER_PLACE_FAIL, ORDER_PLACE_SUCCESS, OrderActions } from "../action/order";
import { OrderState } from "./types/reducerTypes";

const initialState : OrderState = {
    orderNumber: null,
    loading: false,
    error: null,
    ingredientsOrder: []
};


export const orderReducer = (state = initialState, action: OrderActions): OrderState => {
    switch (action.type) {
        case ORDER_PLACE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ORDER_PLACE_SUCCESS:
            return {
                ...state,
                loading: false,
                orderNumber: action.orderNumber,
                ingredientsOrder: action.ingredientsOrder
            };

        case ORDER_PLACE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};

