import React, { useState } from 'react';

import styles from './Verify.module.css';

const Verify = ({ verified }: { verified: boolean | undefined |null }) => {
    const [verifyCode, setVerifyCode] = useState('');

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        setVerifyCode(form.verifyCode.value);
        form.verifyCode.value = '';
    };

    return (
        <>
            {!verified && (
                <div className={`wrapper ${styles.container}`}>
                    <h1 className={styles.title}>Будь-ласка, підтвердіть Вашу пошту</h1>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <label htmlFor="verifyCode" className={styles.label}>
                            Введіть код верифікації
                        </label>
                        <input
                            type="text"
                            id="verifyCode"
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.submitBtn}>
                            Відправити
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Verify;
