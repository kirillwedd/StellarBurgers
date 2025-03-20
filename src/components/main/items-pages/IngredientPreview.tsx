import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../items-pages/IngredientPreview.module.scss';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { useMemo } from 'react';
import { useAppSelector } from '../../../services/hooks';

interface IngredientPreviewProps {
    ingredients: Ingredient[]; 
}

export function IngredientPreview({ ingredients }: IngredientPreviewProps) {
    const ingredientsInStore = useAppSelector(state => state.burgerIngredients.ingredients);

    const ingredientsPreview = useMemo(() => {
        
        
        
        return ingredientsInStore.filter(ingredient => 
            ingredients.some(ing => ing._id === ingredient._id) 
        );
    }, [ingredientsInStore, ingredients]);
    
    
    

    
    const groupedIngredients = ingredientsPreview.reduce<Ingredient[]>((acc, ingredient) => {
        const existing = acc.find(item => item._id === ingredient._id);
        if (existing) {
            existing.count! += 1;
        } else {
            acc.push({ ...ingredient, count: 1 });
        }
        return acc;
    }, []);

    const totalPrice = useMemo(() => {
        return groupedIngredients.reduce((sum, ingredient) => {
            if (ingredient.type === 'bun') {
                return sum + (ingredient.price || 0) * 2; // Удваиваем цену, если это булка
            }
            return sum + (ingredient.price || 0);
        }, 0);
    }, [groupedIngredients]);
    
    const maxIngredients = 5;
    const filteredIngredients = [...groupedIngredients.slice(0, maxIngredients)];

    return (
        <div className={`${styles.ingredientsPrice}`}>
            <div className={`${styles.ingredients}`}>
                {filteredIngredients.map((ingredientPreview, index) => (
                    <div key={ingredientPreview._id} className={`${styles.ingredientPrewiew}`} style={{ zIndex: Math.max(maxIngredients - index, 0) }}>
                        <img src={ingredientPreview.image} className={styles.img} alt={ingredientPreview.name} />
                        {index === filteredIngredients.length - 1 && filteredIngredients.length > maxIngredients && (
                            <div className={styles.ingredientCount}>
                                + {ingredientsPreview.length - maxIngredients}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.price}>
                <p className={`${styles.cost} text_type_digits-default`}>{totalPrice}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    );
}