import classes from './AiContentMessage.module.css';
import React from 'react';

const AiContentMessage = ({ children }) => {
  return <div className={classes['ai-content-message']}>{children}</div>;
};

export default AiContentMessage;
