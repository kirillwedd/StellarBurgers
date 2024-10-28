import { NavItem } from "./nav-item/NavItem"
import { BurgerIcon, ListIcon, Logo, ProfileIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../navigation/Navigation.scss'

export function Navigation(){
 return(
    <nav className="header__menu">
        <ul className="header__menu-list navigation mt-4 mb-4">
            <NavItem><BurgerIcon className="mr-2"/>Конструктор</NavItem>
            <NavItem><ListIcon className="mr-2"/>Лента заказов</NavItem>
        </ul>
        <Logo className="mr-30 "/>
        
         <ul className="header__menu-list navigation">
            <NavItem><ProfileIcon className="mr-2"/>Личный кабинет</NavItem>
         </ul>
    </nav>
 )
}

