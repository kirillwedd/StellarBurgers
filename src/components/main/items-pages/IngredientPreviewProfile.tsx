import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../items-pages/IngredientPreviewProfile.module.scss'
import { Ingredient } from '../../../services/reducer/types/reducerTypes'
import { useMemo } from 'react';
import { useAppSelector } from '../../../services/hooks';



interface IngredientsPreview{
    ingredientsPreview: Ingredient[]
}

export function IngredientPreviewProfile({ingredientsPreview}: IngredientsPreview){
      const { ingredientsBurger, bun } = useAppSelector((state) => state.builderBurger);
      

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

        const maxIngredients = 5; 
        

        

        const groupedIngredients = ingredientsBurger.reduce<Ingredient[]>((acc, ingredient) => {
            const existing = acc.find(item => item._id === ingredient._id);
            
            if (existing) {
                existing.count! += 1; 
            } else {
                acc.push({ ...ingredient, count: 1 }); 
            }
            
            return acc;
        }, []);

        const filteredIngredients = [bun, ...groupedIngredients.slice(0, maxIngredients)].filter(Boolean);



        return (
            <div className={`${styles.ingredientsPrice} mt-6`}>
                <div className={`${styles.ingredients}`}>
                    {filteredIngredients.map((ingredientPreview, index) => (
                        ingredientPreview ? ( 
                            <div key={ingredientPreview.uniqueId} className={`${styles.ingredientPrewiew}`} style={{ zIndex: Math.max(maxIngredients - index, 0) }}>
                                <img src={ingredientPreview.image} className={styles.img} alt={ingredientPreview.name} />
    
                                {index === filteredIngredients.length - 1 && filteredIngredients.length > maxIngredients && (
                                    <div className={styles.ingredientCount}>
                                        + {ingredientsBurger.length - maxIngredients}
                                    </div>
                                )}
                            </div>
                        ) : null 
                    ))}
                </div>
    
                <div className={styles.price}>
                    <p className={`${styles.cost} text_type_digits-default`}>{totalPrice}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        );
}