import { API_URL } from "../../apiConfig";
import { request } from "../../utils/apiUtils";



export const ORDER_PLACE_REQUEST = 'ORDER_PLACE_REQUEST';
export const ORDER_PLACE_SUCCESS = 'ORDER_PLACE_SUCCESS';
export const ORDER_PLACE_FAIL = 'ORDER_PLACE_FAIL';


export const placeOrderRequest = () => ({
    type: ORDER_PLACE_REQUEST
});


export const placeOrderSuccess = (orderNumber, ingredients) => ({
    type: ORDER_PLACE_SUCCESS,
    orderNumber,
    ingredientsOrder: ingredients
});

export const placeOrderFail = (error) => ({
    type: ORDER_PLACE_FAIL,
    error
});


export const placeOrderThunk = (orderData) => {
    return async (dispatch) => {
        dispatch(placeOrderRequest()); 

        try {
            const data = await request(`${API_URL}/orders`, {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(placeOrderSuccess(data.order.number, orderData.ingredients)); 
            return data.order.number; 
        } catch (err) {
            dispatch(placeOrderFail(err.message)); 
            throw err; 
        }
    };
};