
export function BurgerIngredientsNavItem({children} : {children:string}){
    return (
    <li className="burger-ingredients__nav-item navigation-item">
        <a className="navigation-item__link text_type_main-default"href="#">{children}</a>
    </li>
    )
}

