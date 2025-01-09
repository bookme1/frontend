import AiContent from '@/components/Modals/ModalContent/AiContent/AiContent';
import Menu from '@/components/main/DesktopCatalog/Menu.tsx';
import Basket from '@/components/main/Modal/Basket/Basket';
import {
    selectModalContent,
    setModalStatus,
} from '@/lib/redux/slices/modalsSlice/modalsSlice.ts';
import { useDispatch, useSelector } from '@/lib/redux/store.ts';

const ModalContent = () => {
    const modalContent = useSelector(selectModalContent);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(setModalStatus(false));
    };

    switch (modalContent) {
        case 'AI':
            return <AiContent onClose={handleCloseModal} />;
        case 'Catalog':
            return <Menu onClose={handleCloseModal} />;
        case 'Cart':
            return <Basket />;
        default:
            return null;
    }
};

export default ModalContent;
