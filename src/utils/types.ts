import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
});