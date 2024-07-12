'use client';

import React from 'react';
import { Provider } from 'react-redux';

import ModalAiContainer from '@/components/Modals/ModalAiContainer/ModalAiContainer.tsx';
import { reduxStore } from '@/lib/redux/store.ts';

const ModalAiContainerWrapper = () => {
  return (
    <Provider store={reduxStore}>
      <ModalAiContainer />
    </Provider>
  );
};

export default ModalAiContainerWrapper;
