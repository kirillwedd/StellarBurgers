import { NutrienItem } from "./NutrienItem";
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";
import styles from '../Modal.module.scss'

export function IngredientsDetails({ingredient}){
    return(
        <article className={`${styles.modal__information} ${styles.informationIngredients}`}>
               <div className={`${styles.informationIngredients__wrapperImage} mb-4`}>
                <img className={styles.informationIngredients__image} src={ingredient.image} alt={ingredient.name} />
               </div>
               <h2 className={`${styles.informationIngredients__name} mb-8 text_type_main-medium text_color_primary`}>{ingredient.name}</h2>
               <div className={`${styles.informationIngredients__nutriens} mb-15`}>
                 <NutrienItem title="Калории,ккал" count={ingredient.calories} />
                 <NutrienItem title="Белки, г" count={ingredient.proteins}/>
                 <NutrienItem title="Жиры, г" count={ingredient.fat}/>
                 <NutrienItem title="Углеводы, г" count={ingredient.carbohydrates}/>
               </div>           
        </article>
    )
}

IngredientsDetails.propTypes={
  ingredient: ingredientType
}

