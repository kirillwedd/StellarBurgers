import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';
import styles from '../../modal/Modal.module.scss'

interface INutrienItem {
    title: string; 
    count: number; 
}

export function NutrienItem({title, count}: INutrienItem){
    return(
        <article className={`${styles.informationIngredients__nutriensItem} ${styles.nutriensItem} text_color_inactive`}>
            <h4 className={`${styles.nutriensItem__title} text text_type_main-default`}>{title}</h4>
            <p className={`${styles.nutriensItem__count} text text_type_digits-default`}>{count}</p>
        </article>
    )
}



