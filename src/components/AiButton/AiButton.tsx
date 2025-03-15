import React from 'react';

import { Icon } from '@/components/common/Icon';
import { closeAllModals, openModal, useDispatch } from '@/lib/redux';

const AiButton = () => {
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch(closeAllModals());
        dispatch(openModal('ai'));
    };

    return (
        <button onClick={handleModal}>
            <Icon name="ai-chat" width={24} height={24} />
            AI Chat
        </button>
    );
};

export default AiButton;
