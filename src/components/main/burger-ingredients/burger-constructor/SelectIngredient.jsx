import PropTypes from 'prop-types';
import styles from '../../../main/burger-ingredients/burger-constructor/BurgerConstructor.module.scss'

export function SelectedIngredient({type, children, extraClass}) {
    return (
        <article className={`${styles.burger__plugElement} ${type === "top" ? styles.burger__plugElement_top : type === 'middle' ? styles.burger__plugElement_middle : styles.burger__plugElement_bottom} ${extraClass}`}>
            <p>{children}</p>
        </article>
    );
}
SelectedIngredient.propTypes={
    type: PropTypes.string.isRequired,
    children: PropTypes.string,
    extraClass: PropTypes.string
}