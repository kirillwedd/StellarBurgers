import { Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import '../../../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';

export function IngredientItems({src, alt, price, title, onClick}){
    return (
        <article className="burger-item__counter">
            <Counter count={1}/>
        <article className="burger-ingredients__item burger-item" onClick={onClick}>
            <img src={src} alt={alt} className="burger-item__image ml-4 mr-4" />
            <div className="burger-item__price text_type_digits-default mt-1">{price} < CurrencyIcon className="ml-2"/></div>
            <div className="burger-item__title text_type_main-default mt-1">{title}</div>    
        </article>
        </article>
    )
}

IngredientItems.propTypes={
    src: PropTypes.string,
    alt: PropTypes.string,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
}