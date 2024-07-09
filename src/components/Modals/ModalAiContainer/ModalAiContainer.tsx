import Modal from '@/components/Modals/MainModal/MainModal.tsx';
import ModalContent from '@/components/Modals/ModalContent/ModalContent';
import { Providers } from '@/lib/providers.tsx';
import {
  selectOpenModal,
  setModalContent,
  setModalStatus,
} from '@/lib/redux/slices/modalsSlice/modalsSlice.ts';
import { useDispatch, useSelector } from '@/lib/redux/store.ts';

const ModalAiContainer = () => {
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

  return (
    <Providers>
      <>
        <button onClick={handleModal}>AI Modal</button>
        {modalOpen && (
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <ModalContent />
          </Modal>
        )}
      </>
    </Providers>
  );
};

export default ModalAiContainer;
