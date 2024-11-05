import { NutrienItem } from "./NutrienItem";
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";

export function IngredientsDetails({ingredient}){
    return(
        <article className="modal__information information-ingredients">
               <div className="information-ingredients__wrapper-image mb-4">
                <img className="information-ingredients__image" src={ingredient.image} alt={ingredient.name} />
               </div>
               <h2 className="information-ingredients__name mb-8 text_type_main-medium text_color_primary ">{ingredient.name}</h2>
               <div className="information-ingredients__nutriens mb-15">
                 <NutrienItem title="Калории,ккал" count={ingredient.calories} />
                 <NutrienItem title="Белки, г" count={ingredient.proteins}/>
                 <NutrienItem title="Жиры, г" count={ingredient.fat}/>
                 <NutrienItem title="Углеводы, г" count={ingredient.carbohydrates}/>
               </div>           
        </article>
    )
}

IngredientsDetails.propTypes={
  ingredient:PropTypes.arrayOf(ingredientType)
}

IngredientsDetails.defaultProps={
  ingredient:PropTypes.arrayOf(
    PropTypes.shape(
      {
        __v:0
      }
    )
  )
}