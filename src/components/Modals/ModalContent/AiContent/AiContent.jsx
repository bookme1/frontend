import React, { useState } from 'react';
import aiModal from './AiContent.module.css';
import AiContentMessage from '@/components/Modals/ModalContent/AiContent/AiContentMessage';
import { Icon } from '@/components/common/Icon';
import modalStyles from "@/components/Modals/MainModal/MainModal.module.css";
import { setModalStatus, useDispatch } from "@/lib/redux";

const AiContent = ({ onClose }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(message);
        setMessage('');
    };

    const handleCloseModal = () => {
        dispatch(setModalStatus(false));
        onClose();
    };

    return (
        <div className={aiModal.ai_content_wrapper}>
            <div className={aiModal['ai-content-header']}>
                <div>
                    <h2 className={aiModal['ai-content-header_title']}>Привіт</h2>
                    <h3 className={aiModal['ai-content-header_subtitle']}>
                        Як я можу тобі допомогти?
                    </h3>
                </div>
                <Icon name="ai-robot" width={120} height={120} />
            </div>
            <div className={aiModal['ai-content-description']}>
                Я помічник, створений на основі штучного інтелекту і я допоможу тобі вибрати книгу.
            </div>
            <div className={aiModal['ai-content-body']}>
                <AiContentMessage>
                    Я помічник, створений на основі штучного інтелекту і я допоможу тобі вибрати книгу.
                </AiContentMessage>
                <div className={aiModal['message-form-block']}>
                    <form className={aiModal['message-form']} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Повідомлення"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button type="submit" className={aiModal['button-send-message']}>
                            <Icon name="ai-modal-send-message" width={24} height={24} />
                        </button>
                    </form>
                </div>
            </div>
            <button className={modalStyles['close-button']} onClick={handleCloseModal}>
                <Icon width={24} height={24} name={'close-ai-modal'} />
            </button>
        </div>
    );
};

export default AiContent;
