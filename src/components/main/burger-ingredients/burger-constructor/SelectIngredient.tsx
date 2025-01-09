import styles from '../../../main/burger-ingredients/burger-constructor/BurgerConstructor.module.scss'
import { ReactNode } from 'react';

interface ISelectedIngredient {
    type: 'top' | 'middle' | 'bottom'; 
    children: ReactNode; 
    extraClass?: string; 
}

export function SelectedIngredient({type, children, extraClass}: ISelectedIngredient) {
    return (
        <article className={`${styles.burger__plugElement} ${type === "top" ? styles.burger__plugElement_top : type === 'middle' ? styles.burger__plugElement_middle : styles.burger__plugElement_bottom} ${extraClass}`}>
            <p>{children}</p>
        </article>
    );
}
