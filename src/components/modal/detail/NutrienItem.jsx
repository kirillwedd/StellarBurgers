import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import PropTypes from 'prop-types';

export function NutrienItem({title, count}){
    return(
        <article className="information-ingredients__nutriens-item nutriens-item text_color_inactive">
            <h4 className="nutriens-item__title text text_type_main-default">{title}</h4>
            <p className="nutriens-item__count text text_type_digits-default">{count}</p>
        </article>
    )
}

NutrienItem.propTypes={
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}

NutrienItem.defaultProps={
    count: 0
}