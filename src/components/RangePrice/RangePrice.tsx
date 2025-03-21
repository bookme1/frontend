'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './rangePrice.module.css';
import { RangePriceProps } from './rangePrice.types';

const RangePrice: React.FC<RangePriceProps> = ({ filtersData, updateURL }) => {
    const searchParams = useSearchParams();

    // Используем useState для хранения значений цен
    const [minPrice, setMinPrice] = useState<string>(
        searchParams?.get('minPrice') || filtersData.minPrice.toString()
    );
    const [maxPrice, setMaxPrice] = useState<string>(
        searchParams?.get('maxPrice') || filtersData.maxPrice.toString()
    );

    // Функция для обработки изменения в полях ввода
    const handleMinPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMaxPrice(event.target.value);
    };

    // Функция отправки формы
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateURL({
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
    };

    useEffect(() => {
        setMinPrice(filtersData.minPrice?.toString() || '0');
        setMaxPrice(filtersData.maxPrice?.toString() || '0');
    }, [filtersData.minPrice, filtersData.maxPrice]);

    return (
        <div className={styles.range__wrapper}>
            <form onSubmit={handleSubmit}>
                <h2>Ціна</h2>
                <label>
                    <input
                        id="minPrice"
                        type="text"
                        value={minPrice} // Используем value, чтобы значение инпута зависело от состояния
                        onChange={handleMinPriceChange} // Обрабатываем изменение для minPrice
                        placeholder={filtersData.minPrice.toString()}
                    />
                    <input
                        id="maxPrice"
                        type="text"
                        value={maxPrice} // То же самое для maxPrice
                        onChange={handleMaxPriceChange} // Обрабатываем изменение для maxPrice
                        placeholder={filtersData.maxPrice.toString()}
                    />
                </label>
                <button type="submit">OK</button>
            </form>
        </div>
    );
};

export default RangePrice;
