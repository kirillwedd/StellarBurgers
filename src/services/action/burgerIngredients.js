import { v4 as uuid4 } from 'uuid';
import { request } from '../../utils/apiUtils';
import { API_URL } from '../../apiConfig';

export const ADD_INGREDIENT= 'INCREASE_INGREDIENT';
export const TAB_SWITCH= 'TAB_SWITCH';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setIngredients = (items) => {
  return {
      type: ADD_INGREDIENT,
      payload: items.map(item => ({
          ...item,
          uniqueId: uuid4()  
      }))
  }
}
  
  export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
  });
  
  export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
  });

  export const setTabActive=(active)=>({
    type: TAB_SWITCH,
    tabActive: active
  })

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


  