import { GroupIngredients } from "./group-ingredients/GroupIngredients";
import '../burger-ingredients/BurgerIngredients.module.scss'
import '../../navigation/Navigation.scss'
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";
import styles from '../burger-ingredients/BurgerIngredients.module.scss';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { setTabActive} from "../../../services/action/burgerIngredients";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";



export function BurgerIngredients({bunArr, meatArr, sauceArr }){
const activeTab=useSelector((state)=>state.burgerIngredients.activeTab)
const dispatch=useDispatch();

const bunRef = useRef(null);
const sauceRef = useRef(null);
const meatRef = useRef(null);

const headerRefs = {
    bun: bunRef,
    sauce: sauceRef,
    meat: meatRef,
};

const handleTabClick = (tab) => {
    dispatch(setTabActive(tab));
    headerRefs[tab].current.scrollIntoView({ behavior: 'smooth' });
};

const handleScroll = () => {
    const bunRect = bunRef.current.getBoundingClientRect();
    const sauceRect = sauceRef.current.getBoundingClientRect();
    const meatRect = meatRef.current.getBoundingClientRect();
    
    if (bunRect.top >= 0 && bunRect.top < window.innerHeight) {
      dispatch(setTabActive("bun"));
  } else if (sauceRect.top >= 0 && sauceRect.top < window.innerHeight) {
      dispatch(setTabActive("sauce"));
  } else if (meatRect.top >= 0 && meatRect.top < window.innerHeight) {
      dispatch(setTabActive("meat"));
  }
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

    return(
       <section  className={styles.burgerIngredients}>
        <h1 className={`${styles.burgerIngredients__title} text_type_main-large`}>Собери бургер</h1>
         <nav className={`${styles.burgerIngredients__list} mt-5 mb-10`}>
           <Tab value="bun" active={activeTab==='bun'} onClick={handleTabClick}>Булки</Tab>
           <Tab value="sauce" active={activeTab==='sauce'} onClick={handleTabClick}>Соусы</Tab>
           <Tab value="meat" active={activeTab==='meat'} onClick={handleTabClick}>Начинки</Tab>
         </nav>
         <section className={`${styles.listIngredients} custom-scroll`} onScroll={handleScroll}>
        <h2 ref={bunRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Булки</h2>
        <GroupIngredients ingredients={bunArr}/>
        <h2 ref={sauceRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Соусы</h2>
        <GroupIngredients ingredients={sauceArr}/>
        <h2 ref={meatRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Начинки</h2>
        <GroupIngredients ingredients={meatArr}/>
         </section>
       </section>
     
    )

}

BurgerIngredients.propTypes = {
  bunArr: PropTypes.arrayOf(ingredientType),  
  meatArr: PropTypes.arrayOf(ingredientType), 
  sauceArr: PropTypes.arrayOf(ingredientType) 
};

