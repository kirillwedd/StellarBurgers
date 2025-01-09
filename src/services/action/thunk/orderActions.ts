import { API_URL } from "../../../apiConfig";
import { request } from "../../../utils/apiUtils";
import { OrderData } from "../../reducer/types/orderTypes";
import { AppDispatch } from "../../store";
import { placeOrderFail, placeOrderRequest, placeOrderSuccess } from "../order";


export const placeOrderThunk = (orderData: OrderData) => {
    return async (dispatch: AppDispatch) => { 
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
            
            if (err instanceof Error) {
                dispatch(placeOrderFail(err.message)); 
                throw err;
            } else {
                dispatch(placeOrderFail("Произошла неизвестная ошибка"));
                throw new Error("Произошла неизвестная ошибка");
            }
        }
    };
};
