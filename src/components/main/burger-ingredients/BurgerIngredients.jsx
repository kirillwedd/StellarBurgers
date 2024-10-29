import { BurgerIngredientsNavItem } from "../../navigation/nav-item/BurgerIngredientsNavItem";
import { GroupIngredients } from "./group-ingredients/GroupIngredients";
import '../burger-ingredients/BurgerIngredients.scss'
import '../../navigation/Navigation.scss'
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";

export function BurgerIngredients({bunArr, meatArr, sauceArr }){
    return(
       <section className="burger-ingredients custom-scroll">
        <h1 className="burger-ingredients__title text_type_main-large">Собери бургер</h1>
         <nav className="burger-ingredients__list mt-5 mb-10">
           <BurgerIngredientsNavItem>Булки</BurgerIngredientsNavItem>
           <BurgerIngredientsNavItem>Соусы</BurgerIngredientsNavItem>
           <BurgerIngredientsNavItem>Начинки</BurgerIngredientsNavItem>
         </nav>
        <h2 className="ingredients-title text_type_main-medium">Булки</h2>
        <GroupIngredients ingredients={bunArr}/>
        <h2 className="ingredients-title text_type_main-medium ">Соусы</h2>
        <GroupIngredients ingredients={sauceArr}/>
        <h2 className="ingredients-title text_type_main-medium ">Начинки</h2>
        <GroupIngredients ingredients={meatArr}/>
       </section>
     
    )
}

BurgerIngredients.propTypes = {
  bunArr: PropTypes.arrayOf(ingredientType),  
  meatArr: PropTypes.arrayOf(ingredientType), 
  sauceArr: PropTypes.arrayOf(ingredientType) 
};

BurgerIngredients.defaultProps={
  bunArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        __v:0
      }
    )
  ),

  meatArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        __v:0
      }
    )
  ),

  sauceArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        __v:0
      }
    )
  )
}