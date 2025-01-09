import { v4 as uuid4 } from 'uuid';
import { Ingredient } from '../reducer/types/reducerTypes'; // импортируйте интерфейс

export const ADD_INGREDIENT = 'INCREASE_INGREDIENT';
export const TAB_SWITCH = 'TAB_SWITCH';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Определите типы для ваших действий
interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: Array<Ingredient & { uniqueId: string }>; 
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string; // или другой подходящий тип
}

interface SetTabActiveAction {
  type: typeof TAB_SWITCH;
  tabActive: 'bun' | 'sauce' | 'meat'; 
}


export type IngredientActions = AddIngredientAction | SetLoadingAction | SetErrorAction | SetTabActiveAction;


export const setIngredients = (items: Ingredient[]): AddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: items.map(item => ({
      ...item,
      uniqueId: uuid4(),
    })),
  };
};

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: error,
});

export const setTabActive = (active: 'bun' | 'sauce' | 'meat'): SetTabActiveAction => ({
  type: TAB_SWITCH,
  tabActive: active,
});