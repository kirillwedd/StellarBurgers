import { setError, setIngredients, setLoading } from "../burgerIngredients";


export const fetchIngredients = () => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const data = await request(`${API_URL}/ingredients`); 
        dispatch(setIngredients(data.data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
