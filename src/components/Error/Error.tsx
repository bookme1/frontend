import React from 'react';

const Error = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding:'20px 0',
                minHeight:'500px'
            }}
        >
            Oops! Something went wrong. Please try to refresh the page.
        </div>
    );
};

export default Error;
