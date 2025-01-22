import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { Categories } from '@/components/main/Categories';
import { Hero } from '@/components/main/Hero';
import SuccessInfo from '@/components/main/Modal/SuccessInfo/SuccessInfo';
import { SwiperList } from '@/components/main/SwiperList';
import { fetchUserData } from '@/contexts/fetchUserData';
import { useSelector } from '@/lib/redux';
import { useGetBookSetQuery } from '@/lib/redux/features/book/booksetApi';
import { IUser } from '@/lib/redux/features/user/types';

// import { useSignInMutation } from '@/lib/redux/features/user/userApi';

export default async function Home() {
    // const modals = useSelector((state: any) => state.modals.modals);

    const user = await fetchUserData();
    // const {
    //     data: booksets,
    //     isError,
    //     isSuccess,
    //     refetch,
    // } = useGetBookSetQuery();

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log('Данные успешно загружены:', booksets);
    //     }
    //     if (isError) {
    //         console.warn('Error while fetching booksets...');
    //         // refetch();
    //     }
    // }, [isSuccess, booksets, isError, refetch]);

    // const authUserFromSession = async (storedUser: string | null) => {
    //     if (!storedUser) return;
    //     try {
    //         const parsedUser = JSON.parse(storedUser);
    //         if (parsedUser.email && parsedUser.password) {
    //             // Попытка авторизации
    //             const response = await signIn({
    //                 email: parsedUser.email,
    //                 password: parsedUser.password,
    //             });
    //             if (response && response.data) {
    //                 const { user } = response.data;
    //                 setDataOfUser(user);
    //             }
    //         }
    //     } catch (err: any) {
    //         console.error('Error while logging in', err);
    //     }
    // };

    return (
        <>
            <Header userData={user} isLoading={false} />
            <Hero />
            <Categories />
            {/* {booksets && (
                <>
                    <SwiperList
                        name={booksets[0]?.title}
                        bookset={booksets[0].books}
                        id={booksets[0].id}
                    />
                    <SwiperList
                        // value="authors"
                        // parametrData="Стівен Кінг"
                        // name="Стівена Кінга"
                        name={booksets[1]?.title}
                        bookset={booksets[1].books}
                        id={booksets[1].id}
                    />
                    <SwiperList
                        // value="genre"
                        // parametrData="наука"
                        // name="До школи"
                        name={booksets[2]?.title}
                        bookset={booksets[2].books}
                        id={booksets[2].id}
                    />
                </>
            )} */}
            <Footer />
            {/* {modals.successInfo.isOpen && <SuccessInfo />} */}
        </>
    );
}
