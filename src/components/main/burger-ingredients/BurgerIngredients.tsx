import { GroupIngredients } from "./group-ingredients/GroupIngredients";
import PropTypes from 'prop-types';
import styles from '../burger-ingredients/BurgerIngredients.module.scss';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { setTabActive } from "../../../services/action/burgerIngredients";
import { useEffect, useRef } from "react";
import { Ingredient } from "../../../services/reducer/types/reducerTypes";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";

interface BurgerIngredientsProps {
    bunArr: Array<Ingredient>;
    meatArr: Array<Ingredient>;
    sauceArr: Array<Ingredient>;
}

export function BurgerIngredients({ bunArr, meatArr, sauceArr }: BurgerIngredientsProps) {
    const activeTab = useAppSelector((state) => state.burgerIngredients.activeTab);
    const dispatch = useAppDispatch();

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const meatRef = useRef<HTMLHeadingElement>(null);

    const headerRefs = {
        bun: bunRef,
        sauce: sauceRef,
        meat: meatRef,
    };

    const handleTabClick = (tabValue: string) => {
        const tab: 'bun' | 'sauce' | 'meat' = tabValue as 'bun' | 'sauce' | 'meat'; 
        dispatch(setTabActive(tab));
        headerRefs[tab].current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = () => {
        const bunRect = bunRef.current?.getBoundingClientRect();
        const sauceRect = sauceRef.current?.getBoundingClientRect();
        const meatRect = meatRef.current?.getBoundingClientRect();

        if (bunRect && bunRect.top >= 0 && bunRect.top < window.innerHeight) {
            dispatch(setTabActive("bun"));
        } else if (sauceRect && sauceRect.top >= 0 && sauceRect.top < window.innerHeight) {
            dispatch(setTabActive("sauce"));
        } else if (meatRect && meatRect.top >= 0 && meatRect.top < window.innerHeight) {
            dispatch(setTabActive("meat"));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`${styles.burgerIngredients__title} text_type_main-large`}>Собери бургер</h1>
            <nav className={`${styles.burgerIngredients__list} mt-5 mb-10`}>
                <Tab value="bun" active={activeTab === 'bun'} onClick={handleTabClick}>Булки</Tab>
                <Tab value="sauce" active={activeTab === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                <Tab value="meat" active={activeTab === 'meat'} onClick={handleTabClick}>Начинки</Tab>
            </nav>
            <section className={`${styles.listIngredients} custom-scroll`} onScroll={handleScroll}>
                <h2 ref={bunRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Булки</h2>
                <GroupIngredients ingredients={bunArr} />
                <h2 ref={sauceRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Соусы</h2>
                <GroupIngredients ingredients={sauceArr} />
                <h2 ref={meatRef} className={`${styles.ingredientsTitle} text text_type_main-medium`}>Начинки</h2>
                <GroupIngredients ingredients={meatArr} />
            </section>
        </section>
    );
}

