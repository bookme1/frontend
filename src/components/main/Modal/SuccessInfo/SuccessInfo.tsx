import React from 'react';

import styles from './SuccessInfo.module.css';
import { GenericModal } from '@/components/GenericModal/GenericModal';

const SuccessInfo = () => {
    return (
        <GenericModal
            modalName="successInfo"
            align="right"
        >
            <div className={styles.container}>
                <div className={styles.box}>
                    <p className={styles.text}>
                        Книга успішно додана до кошика
                    </p>
                    <button className={styles.readBtn}>Читати</button>
                </div>
            </div>
        </GenericModal>
    );
};

export default SuccessInfo;
