import { BurgerIngredientsNavItem } from "../../navigation/nav-item/BurgerIngredientsNavItem";
import { GroupIngredients } from "./group-ingredients/GroupIngredients";
import '../burger-ingredients/BurgerIngredients.scss'
import '../../navigation/Navigation.scss'
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import PropTypes from 'prop-types';

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

BurgerIngredients.propTypes={
  bunArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        src:PropTypes.string,
        name:PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        __v:PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large:PropTypes.string

      }
    )
  ),

  meatArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        src:PropTypes.string,
        name:PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        __v:PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large:PropTypes.string

      }
    )
  ),

  sauceArr:PropTypes.arrayOf(
    PropTypes.shape(
      {
        src:PropTypes.string,
        name:PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        __v:PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large:PropTypes.string

      }
    )
  )
}

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