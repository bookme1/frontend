'use client';

import React, { useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './rangePrice.module.css';
import { RangePriceProps } from './rangePrice.types';

const RangePrice: React.FC<RangePriceProps> = ({ filtersData, updateURL }) => {
    const searchParams = useSearchParams();
    const minPriceRef = useRef<string>(
        searchParams?.get('minPrice') || filtersData.minPrice.toString()
    );
    const maxPriceRef = useRef<string>(
        searchParams?.get('maxPrice') || filtersData.maxPrice.toString()
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const minPrice = (
            document.getElementById('minPrice') as HTMLInputElement
        ).value;
        const maxPrice = (
            document.getElementById('maxPrice') as HTMLInputElement
        ).value;
        minPriceRef.current = minPrice;
        maxPriceRef.current = maxPrice;
        updateURL({
            minPrice: minPriceRef.current,
            maxPrice: maxPriceRef.current,
        });
    };

    return (
        <div className={styles.range__wrapper}>
            <form onSubmit={handleSubmit}>
                <h2>Ціна</h2>
                <label>
                    <input
                        id="minPrice"
                        type="text"
                        defaultValue={minPriceRef.current}
                        placeholder={filtersData.minPrice.toString()}
                    />
                    <input
                        id="maxPrice"
                        type="text"
                        defaultValue={maxPriceRef.current}
                        placeholder={filtersData.maxPrice.toString()}
                    />
                </label>
                <button type="submit">OK</button>
            </form>
        </div>
    );
};

export default RangePrice;
