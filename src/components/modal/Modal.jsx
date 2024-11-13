import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { ModalOverlay } from "./ModalOverlay";
import styles from'../modal/Modal.module.scss';

export function Modal({modalTitle, onClose, children}){
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(); 
        }
    };

    const handleContentClick = (event) => {
        event.stopPropagation(); 
    };
   
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return()=>{
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[])

    return createPortal(
         <>     
            <ModalOverlay onClick={onClose} handleContentClick={handleContentClick}> 
            <header className={`${styles.modal__header} mt-10 mr-10 ml-10`} >
                <h2 className={`${styles.modal__title} text_type_main-large text`} >{modalTitle}</h2>
                <div className={styles.modal_close} onClick={onClose}><CloseIcon/></div>
            </header>
             {children}
            </ModalOverlay>
         </>, document.getElementById('modals')
    )
}

Modal.propTypes={
    modalTitle: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired
}