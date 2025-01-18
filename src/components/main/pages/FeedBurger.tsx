import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles  from '../pages/FeedBurger.module.scss'
import { useAppSelector } from '../../../services/hooks'
import { StructureIngredient } from '../items-pages/StructureIngredient'
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { useMemo } from 'react';

interface IFeedBurger {
    hidden?: boolean
}

export function FeedBurger({hidden}: IFeedBurger){

    const {ingredientsBurger, bun}=useAppSelector((state)=>state.builderBurger);

    const groupedIngredients = ingredientsBurger.reduce<Ingredient[]>((acc, ingredient) => {
        const existing = acc.find(item => item.name === ingredient.name);
        
        if (existing) {
            existing.count! += 1; 
        } else {
            acc.push({ ...ingredient, count: 1 }); 
        }
        
        return acc;
    }, []);

    const totalPrice = useMemo(() => {
                let price = 0;
                if (bun) {
                    price += bun.price * 2;  
                }
                ingredientsBurger.forEach(ingredient => {
                    price += ingredient.price; 
                });
                return price; 
            }, [bun, ingredientsBurger]);

    const filteredIngredients = [bun, ...groupedIngredients].filter(Boolean);
    return (
        <div className={styles.feedBurgerLayout}>
           { hidden===true ?<div className={`${styles.orderNumber} text_type_digits-default mb-10`}>#{3324}</div> : null}
           <div className={`${styles.feedInfo}`}>
            <p className={`${styles.feedBurgerOrderName} text_type_main-medium`}>hjjjhjj</p>
            <div className={`${styles.statusOrder} text_type_main-default mt-3`}>Выполнен</div>
           </div>
            <section className={`${styles.feedIngredients} mt-15`}>
                <div className={`${styles.titleStructure} text_type_main-medium`}>Состав:</div>
                <ul className={`${styles.orderStructure} mr-6`} >

                    {
                        filteredIngredients.map((ingredient)=>( ingredient ? (
                            <StructureIngredient count={ingredient.type==='bun' ? ingredient.count=2: ingredient.count} price={ingredient.price} src={ingredient.image} name={ingredient.name}/>): null
                        ))
                    }

                </ul>
            </section>

            <div className={`${styles.feedTimePrice} mt-20`}>
                <div className={`${styles.feedTime} text_type_main-default`}>{new Date().getFullYear()}</div>
                <div className={styles.feedPrice}>
                    <p className={`${styles.feedCost} text_type_digits-default mr-1`}>{totalPrice}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>
    )
}

