import styles from '../modal/Modal.module.scss'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import PropTypes from 'prop-types';

export function ModalOverlay({ children}){
    
   

    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            {children}
            </div>
        </div>
    )
}

ModalOverlay.propTypes={
    children: PropTypes.node
}
