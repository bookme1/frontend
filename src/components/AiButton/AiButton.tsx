import React from 'react';

import { Icon } from '@/components/common/Icon';
import {
  selectOpenModal,
  setModalContent,
  setModalStatus,
  useDispatch,
  useSelector,
} from '@/lib/redux';

const AiButton = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector(selectOpenModal);

  const handleModal = () => {
    dispatch(setModalStatus(!modalOpen));
    dispatch(setModalContent('AI'));
  };

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(''));
  };

  const classes = modalOpen
    ? 'ai-open-button visually-hidden'
    : 'ai-open-button';

  return (
    <button className={classes} onClick={handleModal}>
      <Icon name="ai-chat" width={24} height={24} />
      AI Chat
    </button>
  );
};

export default AiButton;
