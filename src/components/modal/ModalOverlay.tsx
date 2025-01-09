import styles from '../modal/Modal.module.scss'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import '../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css'
import PropTypes from 'prop-types';

interface IModalOverlay {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleContentClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function ModalOverlay({ children, onClick, handleContentClick} : IModalOverlay){
    return(
        <div className={styles.modalOverlay} onClick={onClick} >
            <div className={styles.modalContent} onClick={handleContentClick}>
            {children}
            </div>
        </div>
    )
}

