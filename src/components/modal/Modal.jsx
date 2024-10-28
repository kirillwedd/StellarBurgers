import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export function Modal({modalTitle, onClose}){
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(); 
        }
    };
   
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return()=>{
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[])

    return(
            <header className="modal__header mt-10 mr-10 ml-10">
                <h1 className="modal__title text_type_main-large text" >{modalTitle}</h1>
                <div className="modal_close" onClick={onClose}><CloseIcon/></div>
            </header>        
    )
}

Modal.propTypes={
    modalTitle: PropTypes.string,
    onClose: PropTypes.func,
}