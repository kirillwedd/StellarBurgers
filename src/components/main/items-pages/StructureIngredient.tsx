import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../items-pages/StructureIngredients.module.scss'

interface IStructureIngredient {
    price: number;
    src: string;
    name:string;
    count:number |undefined;
}

export function StructureIngredient({price, src, name, count}: IStructureIngredient){
    return (
        <div className={`${styles.structureIngredient}`}>
            <div className={styles.structureIngredientImage}>
            <img className={`${styles.img}`} src={src} alt={name} />
            </div>
            <p className={`${styles.structureIngredientTitle} text_type_main-default ml-4 mr-4`}>{name}</p>
            <div className={`${styles.structureIngredientPrice}`}>
            <p className={`${styles} text_type_digits-default`}>{`${count}x${price}`}</p>
            <CurrencyIcon type='primary'/>
            </div>
        </div>
    )
}

