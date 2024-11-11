import '../../burger-ingredients/burger-constructor/BurgerConstructor.scss'
import PropTypes from 'prop-types';

export function SelectedIngredient({type, children, extraClass}){
    return(
        <article className={`burger__plug-element ${type==="top" ? "burger__plug-element--top" : type==='middle' ? "burger__plug-element--middle" :
                            "burger__plug-element--bottom"} ${extraClass}`}>
            <p className=''>{children}</p>
        </article>
    )
}

SelectedIngredient.PropTypes={
    type: PropTypes.string.isRequired,
    children: PropTypes.string,
    extraClass: PropTypes.string
}