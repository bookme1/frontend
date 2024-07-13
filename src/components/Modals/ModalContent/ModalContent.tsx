import AiContent from '@/components/Modals/ModalContent/AiContent/AiContent';
import { selectModalContent } from '@/lib/redux/slices/modalsSlice/modalsSlice.ts';
import { useSelector } from '@/lib/redux/store.ts';

const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent) {
    case 'AI':
      return <AiContent />;

    default:
      return null;
  }
};

export default ModalContent;
