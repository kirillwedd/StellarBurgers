import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";


export function Bun({bun, type, extraClass}){

    return(
        <ConstructorElement
        type={type}
        isLocked="true"
        price={bun.price}
        thumbnail={bun.image}
        text={bun.name}
        extraClass={extraClass}
        key={bun._id}/>
    )
}

Bun.propTypes={
    bun: PropTypes.arrayOf(ingredientType),
    type: PropTypes.string,
    extraClass: PropTypes.string
}