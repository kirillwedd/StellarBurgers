import { NavItem } from "./nav-item/NavItem"
import { BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../navigation/Navigation.scss'
import { useNavigate } from "react-router-dom";

export function Navigation(){
  const navigate= useNavigate();
 return(
    <nav className="header__menu">
        <ul className="header__menu-list navigation mt-4 mb-4">
            <NavItem to={"/"}><BurgerIcon type="primary"  className="mr-2"/>Конструктор</NavItem>
            <NavItem to={"/feed"}><ListIcon type="primary" className="mr-2"/>Лента заказов</NavItem>
        </ul>
         
         <div  onClick={()=>navigate('/')}>
           <Logo className="mr-30" />
         </div>
        
         <ul className="header__menu-list navigation">
            <NavItem to={"/profile"}><ProfileIcon type="primary" className="mr-2"/>Личный кабинет</NavItem>
         </ul>
    </nav>
 )
}

