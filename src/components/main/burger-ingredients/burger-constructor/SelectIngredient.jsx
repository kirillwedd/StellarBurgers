import '../../burger-ingredients/burger-constructor/BurgerConstructor.scss'

export function SelectedIngredient({type, children, extraClass}){
    return(
        <article className={`burger__plug-element ${type==="top" ? "burger__plug-element--top" : type==='middle' ? "burger__plug-element--middle" :
                            "burger__plug-element--bottom"} ${extraClass}`}>
            <p className=''>{children}</p>
        </article>
    )
}