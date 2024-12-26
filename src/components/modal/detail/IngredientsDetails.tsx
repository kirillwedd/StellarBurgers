import { NutrienItem } from "./NutrienItem";
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";
import styles from '../Modal.module.scss';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";

export function IngredientsDetails() {
    const { _id } = useParams();
    const ingredients = useSelector((state : RootState) => state.burgerIngredients.ingredients);

    const currentIngredient = ingredients.find(item => item._id === _id);

    if (!currentIngredient) {
        return null;
    }

    return (
        <article className={`${styles.modal__information} ${styles.informationIngredients}`}>
            <div className={`${styles.informationIngredients__wrapperImage} mb-4`}>
                <img className={styles.informationIngredients__image} src={currentIngredient.image} alt={currentIngredient.name}  />
            </div>
            <h2 className={`${styles.informationIngredients__name} mb-8 text_type_main-medium text_color_primary`}>{currentIngredient.name}</h2>
            <div className={`${styles.informationIngredients__nutriens} mb-15`}>
                <NutrienItem title="Калории, ккал" count={currentIngredient.calories} />
                <NutrienItem title="Белки, г" count={currentIngredient.proteins} />
                <NutrienItem title="Жиры, г" count={currentIngredient.fat} />
                <NutrienItem title="Углеводы, г" count={currentIngredient.carbohydrates} />
            </div>
        </article>
    );
}
