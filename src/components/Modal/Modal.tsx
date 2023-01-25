import { PropsWithChildren } from 'react';
import styles from './Modal.module.css';

function Modal({children, isShowing, closeModal}: PropsWithChildren & {isShowing: boolean, closeModal: () => void}) { 
    if (!isShowing) return <></>
    return ( 
        <>
            <div className={styles.shadow} onClick={() => closeModal()}></div>
            <div className={styles.modal}>
                {children}
            </div>
        </>
    )
}


export default Modal