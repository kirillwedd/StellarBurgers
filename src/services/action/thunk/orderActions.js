import { API_URL } from "../../../apiConfig";
import { request } from "../../../utils/apiUtils";
import { placeOrderFail, placeOrderRequest, placeOrderSuccess } from "../order";


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

