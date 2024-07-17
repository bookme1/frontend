'use client';

import { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './control.module.css';
import { Loading } from '@/components/SERVICE_PAGES/Loading';
import {
    useGetFilterBooksQuery,
    useGetFiltersQuery,
} from '@/lib/redux/features/book/bookApi';

import Filter from '../Filter/Filter';
import Link from 'next/link';
import { IBook } from '@/app/book/[id]/page.types';
import Image from 'next/image';
import FavoriteBtn from '@/components/Favorite/FavoriteBtn';
import { Icon } from '@/components/common/Icon';

const Controls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const authors = decodeURIComponent(searchParams?.get('authors') || '');
    const minPrice = decodeURIComponent(searchParams?.get('minPrice') || '');
    const maxPrice = decodeURIComponent(searchParams?.get('maxPrice') || '');
    const publishers = decodeURIComponent(
        searchParams?.get('publishers') || ''
    );
    const languages = decodeURIComponent(searchParams?.get('languages') || '');
    const genres = decodeURIComponent(searchParams?.get('genre') || '');

    const { data: filterBooks, isLoading } = useGetFilterBooksQuery({
        authors,
        minPrice,
        maxPrice,
        publishers,
        languages,
        genres,
    });

    const { data: filtersData, isLoading: loaderFilter } =
        useGetFiltersQuery('');
            
    const loader = useRef<HTMLDivElement | null>(null);
            
    useEffect(() => {
        const handleResize = () => {
            // Your resize logic here
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const loadMoreItems = () => {
            // Your load more items logic here
        };

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 1.0,
            }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const quantity = filterBooks?.length;

    return (
        <>
            {isLoading && loaderFilter ? (
                <Loading />
            ) : (
                <section className={styles.section}>
                  <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <Filter filtersData={filtersData} />
                        <div className={styles.product__section}>
                            <div className={styles.information}>
                              <div className={styles.information__quantity}>{quantity} Товарів</div>
                              <ul className={styles.information__list}>
                                <li><button>За Рейтингом</button></li>
                                <li><button>Дешевше</button></li>
                                <li><button>Дорожче</button></li>
                              </ul>
                            </div>
                            <ul className={styles.product__list}>
                              {filterBooks &&
                                filterBooks.map((book: IBook) => (
                                  <li key={book.id} className={styles.product__item}>
                                    <Link href={`book/${book.id}`}>
                                      <Image width={230} height={288} className={styles.product__img} src={book.url} alt={book.title} />
                                      <div className={styles.product__wrapper}>
                                        <div className={styles.product__wrapper_information}>
                                          <p className={styles.product__title}>{book.title}</p>
                                          <p className={styles.product__author}>{book.author}</p>
                                        </div>
                                        <div className={styles.product__wrapper_functionality}>
                                          <span>{book.price}</span>
                                          <div className={styles.product__wrapper_button}>
                                            <FavoriteBtn book={book} isFavAlredy={false} />
                                            <button className={styles.button__basket}>
                                              <Icon name="basket" size={24} color="#fff" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                              ))}
                            </ul>
                            <div
                                ref={loader}
                                style={{
                                    height: '100px',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </div>
                    </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Controls;
