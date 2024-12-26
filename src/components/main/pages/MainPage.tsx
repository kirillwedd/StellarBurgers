import React from 'react';
import { BurgerConstructor } from '../burger-ingredients/burger-constructor/BurgerConstructor';
import { BurgerIngredients } from '../burger-ingredients/BurgerIngredients';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';


export function MainPage() {
    const {ingredients}=useSelector((state : RootState)=>state.burgerIngredients);
    const bun=ingredients.filter(ingredient=>ingredient.type==="bun")
    const main=ingredients.filter(ingredient=>ingredient.type==="main")
    const sauce=ingredients.filter(ingredient=>ingredient.type==="sauce")
    return (
        <>
        <BurgerIngredients bunArr={bun} meatArr={main} sauceArr={sauce}/>
        <BurgerConstructor/>
        </>
    )
}