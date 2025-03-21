import React from 'react';

const Error = () => {
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0',
                minHeight: '500px',
            }}
        >
            <span style={{ fontSize: '24px' }}>
                Oops! Щось пішло не так. Мабуть автори прямо зараз пишуть нові
                книжки. Спробуйте оновити сторінку.
            </span>

            <button
                onClick={handleRefresh}
                style={{
                    padding: '20px',
                    color: 'white',
                    backgroundColor: 'var(--red)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '24px',
                }}
            >
                Оновити сторінку
            </button>
        </div>
    );
};

export default Error;
