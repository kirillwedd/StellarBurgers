export const ADD_INGREDIENT= 'INCREASE_INGREDIENT';
export const TAB_SWITCH= 'TAB_SWITCH';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setIngredients = (ingredients) => ({
    type: ADD_INGREDIENT,
    payload: ingredients,
  });
  
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


  