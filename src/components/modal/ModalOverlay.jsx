import { Modal } from "./Modal";
import '../modal/Modal.scss'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

export function ModalOverlay({onClose, isShowModal, content}){
    
    return createPortal(
        <div className="modal " onClick={(close)=>onClose(!close)}>
            <Modal modalTitle={isShowModal ? "Детали ингредиента" : ""} onClose={onClose}/>
            {content}
        </div>, document.getElementById('root')
    )
}

Modal.propTypes={
    onClose: PropTypes.func,
    isShowModal: PropTypes.bool.isRequired,
    content: PropTypes.elementType
}
