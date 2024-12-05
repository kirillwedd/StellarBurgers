import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

export function NavItem({ children, to }) {
    return (
        <li className="header__menu-item navigation-item mr-2">
            <NavLink 
                to={to} 
                className="header__menu-link navigation-link text_type_main-default ml-5 mr-5" 
                activeClassName="active">
                {children}
                
            </NavLink>
        </li>
    );
}

NavItem.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};