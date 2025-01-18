import { useAppSelector } from "../../../services/hooks";
import styles from '../items-pages/CardOrderProfile.module.scss'
import { Link, useLocation } from "react-router-dom";
import { IngredientPreviewProfile } from "./IngredientPreviewProfile";

export function CardOrderProfile({id}: {id: number}){
      const {ingredientsBurger}=useAppSelector((state)=>state.builderBurger);
      const location =useLocation();
        const time= new Date();
        return(
            <Link to={`/feed/${id}`} state={{ background: location }}   className={styles.link}>
            <article className={`${styles.cardOrder} pb-6`}>
                <div className={`${styles.orderID} mt-6`}>
                <div className={`${styles.id} text_type_digits-default `}>{`# ${id}`}</div>
                <div className={`${styles.OrderID__time} text_type_main-default`}>{time.getTime().toLocaleString()}</div>
                </div>
                <div className={`${styles}`}>
                 <div className={`${styles.cardOrderTitle} mt-6 text_type_main-medium `}>hghghhg</div>
                 <div className={`${styles.ready} text_type_main-default mt-2`}>Создан</div>
                </div>
                <IngredientPreviewProfile ingredientsPreview={ingredientsBurger} />
            </article>
            </Link>
        )
}