import { Swiper, SwiperSlide } from 'swiper/react';

import { A11y, Navigation } from 'swiper/modules';

import styles from './LastBooksSwiper.module.css';
import { useGetBooksQuery } from '@/lib/redux/features/book/bookApi';

import Error from '../Error/Error';
import BookItem from '../book/Item/BookItem';
import { Icon } from '../common/Icon';

const LastBooksSwiper = () => {
    const lastBooksId = JSON.parse(
        localStorage.getItem('lastVisitedRoutes') || '[]'
    ) as string[];
    const isVisible =
        lastBooksId === undefined || lastBooksId?.length === 0 ? false : true;

    const { data: books, error, isLoading } = useGetBooksQuery();

    const lastBooks =
        books?.filter(book => lastBooksId.includes(book.id)) || [];

    return (
        <>
            <div className={`${styles.styledWrapper} wrapper`}>
                <div className={styles.sliderControls}>
                    <h2 className={styles.controlsTitle}>
                        Останні переглянуті книжки
                    </h2>
                    <div className={styles.controlsContainer}>
                        <a
                            className={`${styles.controlsLink} arrow-left arrow`}
                        >
                            <Icon name="arrow_left" size={24} />
                        </a>
                        <a
                            className={`${styles.controlsLink} arrow-right arrow`}
                        >
                            <Icon name="arrow_right" size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <Swiper
                autoplay={true}
                slidesPerView={2}
                loop={true}
                spaceBetween={20}
                modules={[Navigation, A11y]}
                className={`mySwiper ${styles.swiperContainer}`}
                navigation={{
                    nextEl: '.arrow-right',
                    prevEl: '.arrow-left',
                }}
                a11y={{
                    enabled: true,
                    prevSlideMessage: 'Попередній слайд',
                    nextSlideMessage: 'Наступний слайд',
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 5,
                    },
                    1280: {
                        slidesPerView: 7,
                    },
                }}
            >
                {isVisible ? (
                    lastBooks?.map(book => (
                        <SwiperSlide style={{ width: '320px' }} key={book.id}>
                            <BookItem isSwiper={true} book={book} />
                        </SwiperSlide>
                    ))
                ) : (
                    <Error />
                )}
            </Swiper>
        </>
    );
};

export default LastBooksSwiper;
