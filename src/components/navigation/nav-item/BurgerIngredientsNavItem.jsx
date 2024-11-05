import PropTypes from 'prop-types';

export function BurgerIngredientsNavItem({children}){
    return (
    <li className="burger-ingredients__nav-item navigation-item">
        <a className="navigation-item__link text_type_main-default"href="#">{children}</a>
    </li>
    )
}

BurgerIngredientsNavItem.propTypes={
    children: PropTypes.string.isRequired
};