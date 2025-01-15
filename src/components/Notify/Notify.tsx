import React, { useEffect, useState } from 'react';

import style from './Notify.module.css';

type MessageType = 'error' | 'information' | 'success';

interface MessagePopupProps {
    text: string;
    duration: number; 
    type: MessageType;
}

const Notify: React.FC<MessagePopupProps> = ({ text, duration, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), duration * 1000);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!isVisible) return null;

    return (
        <div
            className={`${style.popup} ${style[type]}`}
            style={{ animationDuration: `${duration}s` }}
        >
            {text}
        </div>
    );
};

export default Notify;
