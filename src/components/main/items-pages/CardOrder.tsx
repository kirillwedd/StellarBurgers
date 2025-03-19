import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../items-pages/CardOrder.module.scss'
import { IngredientPreview } from "./IngredientPreview";
import { useAppSelector } from "../../../services/hooks";
import { Link, useLocation } from "react-router-dom";
import { Ingredient } from "../../../services/reducer/types/reducerTypes";
export function CardOrder({id, ingredientsBurgers, createdAt, title}: {id: number, ingredientsBurgers: Ingredient[], createdAt: string, title:string}){
    
    const time= new Date();
    const location =useLocation();
   
    return(
        <Link to={`/feed/${id}`} state={{ background: location}} className={styles.link}>
        <article className={`${styles.cardOrder} pb-6 mb-4`}>
            <div className={`${styles.orderID} mt-6`}>
            <div className={`${styles.id} text_type_digits-default `}>{`# ${id}`}</div>
            <div className={`${styles.OrderID__time} text_type_main-default`}><FormattedDate date={new Date(createdAt)}/></div>
            </div>
            <div className={`${styles.cardOrderTitle} mt-6 text_type_main-medium mb-6`}>{title}</div>
            <IngredientPreview ingredients={ingredientsBurgers} />
        </article >
        </Link>
    )
}

