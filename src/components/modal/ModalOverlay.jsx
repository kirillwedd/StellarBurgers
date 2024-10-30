import '../modal/Modal.scss'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import PropTypes from 'prop-types';

export function ModalOverlay({onClose, children}){
    
    const handleOverlayClick = () => {
            onClose();
    };

    return(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes={
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
}
