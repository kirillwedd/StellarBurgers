
import { Action } from "redux";
import { API_URL } from "../../../apiConfig";
import { request } from "../../../utils/apiUtils";
import { AppThunk } from "../../reducer/types/ingredientTypes";
import { RootState } from "../../store";
import { setError, setIngredients, setLoading } from "../burgerIngredients";
import { ThunkAction } from "redux-thunk";


export const fetchIngredients = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const ingredients = await request(`${API_URL}/ingredients`);
        dispatch(setIngredients(ingredients.data));
    } catch (error: unknown) { 
        if (error instanceof Error) {
            
            dispatch(setError(error.message));
        } else {
            
            dispatch(setError("Неизвестная ошибка."));
        }
    } finally {
        dispatch(setLoading(false));
    }
};