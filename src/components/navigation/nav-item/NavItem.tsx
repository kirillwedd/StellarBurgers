import { NavLink } from 'react-router-dom';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

interface INavItem {
    children: React.ReactNode;
    to: string; 
}

export function NavItem({ children, to }: INavItem) {
    return (
        <li className="header__menu-item navigation-item mr-2">
            <NavLink 
                to={to} 
                className={({ isActive }) => 
                    `header__menu-link navigation-link text_type_main-default ml-5 mr-5 ${isActive ? 'active' : ''}`
                }
            >
                {children}
            </NavLink>
        </li>
    );
}

