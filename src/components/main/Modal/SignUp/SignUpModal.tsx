import { Dispatch, SetStateAction, useState } from 'react';

import styles from './SignUpModal.module.css';
import Notify from '@/components/Notify/Notify';
import { NotificationState, NotifyType } from '@/components/Notify/NotifyType';
import { Icon } from '@/components/common/Icon';
import { useSignUpMutation } from '@/lib/redux/features/user/userApi';


const SignUpModal = ({
    setType,
}: {
    setType: Dispatch<SetStateAction<string>>;
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [signUp, { data, error, isLoading }] = useSignUpMutation();

    const [notification, setNotification] = useState<NotificationState>({
        isVisible: false,
        text: '',
        type: 'information',
    });

    const updateNotification = (newValues: Partial<typeof notification>) => {
        setNotification(prev => ({ ...prev, ...newValues }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const role = isAuthor ? 'Author' : 'User';
            await signUp({ username: name, email, password, role }).unwrap();

            updateNotification({
                isVisible: true,
                text: 'Реєстрація успішна!',
                type: 'success',
            });

            updateNotification({
                isVisible: true,
                text: 'Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі',
                type: 'information',
            });
        } catch (err: any) {
            updateNotification({
                isVisible: true,
                text: `Помилка при реєстрації ${err.status}`,
                type: 'error',
            });
            console.error('Error while registering', err);
        }
    };

    return (
        <div>
            <p className={styles.title}>Створити профіль</p>
            <p className={styles.description}>
                Заповніть всі поля нижче, щоб створити свій профіль
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.modalInput}
                    placeholder="Ім'я"
                    onChange={evt => setName(evt.target.value)}
                    required
                />
                <input
                    className={styles.modalInput}
                    placeholder="Імейл"
                    onChange={evt => setEmail(evt.target.value)}
                    required
                />
                <div style={{ position: 'relative' }}>
                    <input
                        className={styles.modalInput}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        onChange={evt => setPassword(evt.target.value)}
                        required
                    />
                    <Icon
                        name={showPassword ? 'icon-eye' : 'icon-eye-slash'}
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className={styles.checkboxContainer}>
                    <input
                        className={styles.roleCheckbox}
                        type="checkbox"
                        id="isAuthor"
                        checked={isAuthor}
                        onChange={() => setIsAuthor(!isAuthor)}
                    />
                    <label
                        className={styles.roleCheckboxLabel}
                        htmlFor="isAuthor"
                    >
                        Реєстрація як автор
                    </label>
                </div>
                {notification.isVisible && (
                    <Notify
                        text={notification.text}
                        duration={5}
                        type={notification.type}
                    />
                )}
                <button className={styles.submitButton} type="submit">
                    Зареєструватись
                </button>
            </form>
            <p className={styles.agreement}>
                Реєструючись, ви погоджуєтеся
                <a className={styles.agrementLink} href="#">
                    з угодою користувача і політикою конфіденційності
                </a>
                bookme
            </p>
            <p className={styles.description}>
                Або зареєструйтесь за допомогою:
            </p>
            <p className={styles.description}>
                Вже є профіль?
                <button
                    className={styles.changeModalButton}
                    onClick={() => setType('sign-in')}
                >
                    Вхід
                </button>
            </p>
        </div>
    );
};

export default SignUpModal;
