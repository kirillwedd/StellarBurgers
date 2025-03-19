import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../pages/FeedBurger.module.scss';
import { useAppSelector } from '../../../services/hooks';
import { StructureIngredient } from '../items-pages/StructureIngredient';
import { Ingredient } from '../../../services/reducer/types/reducerTypes';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom'; 
import { IOrder } from '../../../services/reducer/types/wsTypes';

interface IFeedBurger {
    hidden?: boolean
}

export function FeedBurger({ hidden }: IFeedBurger) {
    const { number } = useParams(); 
    const time = new Date();
    const { orders } = useAppSelector(state => state.ws);

    // Получаем конкретный заказ по номеру
    const order = orders.find((order: IOrder) => order.number === Number(number));

    if (!order) {
        return <div>Заказ не найден</div>; // Если заказ не найден, отображаем сообщение
    }

    // Получаем массив ингредиентов по их идентификаторам
    const ingredientsOrder = order.ingredients;

    const {ingredients} = useAppSelector(state => state.burgerIngredients); // массив всех ингредиентов из состояния Redux

    // Получаем ингредиенты для данного заказа
    const groupedIngredients = ingredients.filter((ingredient: Ingredient) => ingredientsOrder.includes(ingredient._id)).reduce<Ingredient[]>((acc: Ingredient[], ingredient: Ingredient) => {
        const existing = acc.find(item => item.name === ingredient.name);
        
        if (existing) {
            existing.count! += 1; 
        } else {
            acc.push({ ...ingredient, count: 1 }); 
        }
        
        return acc;
    }, []);

    const bun = groupedIngredients.find(ingredient => ingredient.type === 'bun');
    const totalPrice = useMemo(() => {
        let price = 0;
        if (bun) {
            price += bun.price * 2;  
        }
        groupedIngredients.forEach(ingredient => {
            if (ingredient.type !== 'bun') {
                price += ingredient.price * (ingredient.count || 0); 
            }
        });
        return price; 
    }, [bun, groupedIngredients]);
    
    // Формируем массив ингредиентов, добавляя булку только в том случае, если она существует
    const filteredIngredients = groupedIngredients.filter(ingredient => ingredient.type !== 'bun'); 
    if (bun) {
        filteredIngredients.unshift(bun); // Добавляем булку в начало массива, если она существует
    }
    
    return (
        <div className={` ${styles.feedBurgerLayout} ml-9`}>
          
            <div className={`${styles.feedInfo}`}>
                <p className={`${styles.feedBurgerOrderName} text_type_main-medium`}>{order.name}</p>
                <div className={`${styles.statusOrder} text_type_main-default mt-3`}>{order.status === 'done' ? 'выполнен' : 'в процессе'}</div>
            </div>
            <section className={`${styles.feedIngredients} mt-15`}>
                <div className={`${styles.titleStructure} text_type_main-medium`}>Состав:</div>
                <ul className={`${styles.orderStructure} mr-6`}>
                    {
                        filteredIngredients.map(ingredient => (
                            ingredient ? (
                                <StructureIngredient
                                    key={ingredient._id}
                                    count={ingredient.type==='bun'? 2 : ingredient.count}
                                    price={ingredient.price}
                                    src={ingredient.image}
                                    name={ingredient.name}
                                />
                            ) : null
                        ))
                    }
                </ul>
            </section>
            <div className={`${styles.feedTimePrice} mt-15`}>
                <div className={`${styles.feedTime} text_type_main-default`}><FormattedDate date={new Date(order.createdAt)} /></div>
                <div className={styles.feedPrice}>
                    <p className={`${styles.feedCost} text_type_digits-default mr-1`}>{totalPrice}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
}