import React from 'react';

import classes from './AiContentMessage.module.css';

const AiContentMessage = ({ children }: { children: any }) => {
  return <div className={classes['ai-content-message']}>{children}</div>;
};

export default AiContentMessage;
