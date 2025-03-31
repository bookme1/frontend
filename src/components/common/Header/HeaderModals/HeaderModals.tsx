import { GenericModal } from '@/components/GenericModal/GenericModal';
import Burger from '@/components/main/BurgerModal/Burger';
import Menu from '@/components/main/DesktopCatalog/Menu';
import Basket from '@/components/main/Modal/Basket/Basket';
import SignIn from '@/components/main/Modal/SignIn/SignIn';
import SignUp from '@/components/main/Modal/SignUp/SignUp';
import { closeAllModals, openModal, useDispatch } from '@/lib/redux';

const HeaderModals = () => {
    const dispatch = useDispatch();

    const closeModals = () => {
        dispatch(closeAllModals());
    };

    const handleModalSignUp = () => {
        dispatch(closeAllModals());
        dispatch(openModal('signUp'));
    };

    const handleModalSignIn = () => {
        dispatch(closeAllModals());
        dispatch(openModal('signIn'));
    };

    const handleCartModal = () => {
        dispatch(closeAllModals());
        dispatch(openModal('cart'));
    };

    return (
        <>
            <GenericModal modalName={'signIn'} align={'center'}>
                <SignIn handleModalSignUp={handleModalSignUp} />
            </GenericModal>
            <GenericModal modalName={'signUp'} align={'center'}>
                <SignUp
                    handleModalSignIn={handleModalSignIn}
                    onClose={closeModals}
                />
            </GenericModal>
            <GenericModal modalName={'catalog'} align={'center'}>
                <Menu onClose={closeModals} />
            </GenericModal>
            <GenericModal modalName={'cart'} align={'center'}>
                <Basket onClose={closeModals} />
            </GenericModal>
            <GenericModal modalName={'burger'} align={'right'}>
                <Burger
                    handleModalSignIn={handleModalSignIn}
                    handleCartModal={handleCartModal}
                />
            </GenericModal>
        </>
    );
};

export default HeaderModals;
