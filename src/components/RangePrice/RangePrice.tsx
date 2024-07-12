import React, { useState } from 'react';

import styles from './rangePrice.module.css';
import { RangePriceProps } from './rangePrice.types';
import { useSearchParams } from 'next/navigation';

const RangePrice: React.FC<RangePriceProps> = ({ filtersData, updateURL }) => {
    const numberPattern = /^\d*\.?\d*$/;
    const searchParams = useSearchParams();
    const [minPrice, setMinPrice] = useState<string>(searchParams?.get("minPrice") ||
        filtersData.minPrice.toString()
    );
    const [maxPrice, setMaxPrice] = useState<string>(searchParams?.get("maxPrice") ||
        filtersData.maxPrice.toString()
    );

    const handleMinPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        if (numberPattern.test(value) && Number(value) >= filtersData.minPrice) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        if (numberPattern.test(value) && Number(value) <= filtersData.maxPrice) {
            setMaxPrice(value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateURL({
            minPrice: minPrice,
            maxPrice: maxPrice
        });
    };

    return (
        <div className={styles.range__wrapper}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder={filtersData.minPrice.toString()}
                    />
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder={filtersData.maxPrice.toString()}
                    />
                </label>
                <button type="submit">OK</button>
            </form>
        </div>
    );
};

export default RangePrice;
