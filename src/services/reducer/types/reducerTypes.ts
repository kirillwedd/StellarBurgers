import { User } from "./userTypes";

export interface Ingredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId: string;
    count?:number;

}

export interface BurgerIngredientsState {
    ingredients: Ingredient[],
    loading: boolean;
    error: string | null;
    activeTab: 'bun' | 'sauce' | 'meat';
  }

export interface BurgerConstructorState {
    ingredientsBurger: Ingredient[];
    bun: Ingredient | null; 
}

export interface OrderState {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
    ingredientsOrder: string[]; 
}

export interface UserState {
    isForgotPassword?: boolean;
    loading?:boolean;
    error:string | null;
    user: User | null;
    isLoggedIn: boolean;

}