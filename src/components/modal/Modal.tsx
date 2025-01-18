import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { ModalOverlay } from "./ModalOverlay";
import styles from'../modal/Modal.module.scss';

interface IModal {
    modalTitle?: string;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({modalTitle, onClose, children} : IModal){
    const handleKeyDown = (event : KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose(); 
        }
    };

    const handleContentClick = (event : React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); 
    };
   
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return()=>{
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[])

    const modalRoot = document.getElementById('modals');
    if (!modalRoot) return null;

    return createPortal(
         <>     
            <ModalOverlay  onClick={onClose} handleContentClick={handleContentClick}> 
            <header className={`${styles.modal__header} mt-10 mr-10 ml-10`} >
                <h2 className={`${styles.modal__title} text_type_main-large text`} >{modalTitle}</h2>
                <div className={styles.modal_close} onClick={onClose}><CloseIcon type="primary"/></div>
            </header>
             {children}
            </ModalOverlay>
         </>, modalRoot
    )
}

