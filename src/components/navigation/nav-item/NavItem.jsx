import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import PropTypes from 'prop-types';
export function NavItem({children}){
 return (
    <li className="header__menu-item navigation-item mr-2">
        <a className="header__menu-link navigation-link text_type_main-default ml-5 mr-5"href="#">{children}</a>
    </li>
 )
}

NavItem.prropTypes={
children: PropTypes.string.isRequired
};