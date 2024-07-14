import AiContent from '@/components/Modals/ModalContent/AiContent/AiContent';
import { selectModalContent } from '@/lib/redux/slices/modalsSlice/modalsSlice.ts';
import { useSelector } from '@/lib/redux/store.ts';
import Menu from "@/components/main/DesktopCatalog/Menu.tsx";

const ModalContent = () => {
  const modalContent = useSelector(selectModalContent);

  switch (modalContent) {
    case 'AI':
      return <AiContent />;
      case 'Catalog':
      return <Menu />;

    default:
      return null;
  }
};

export default ModalContent;
