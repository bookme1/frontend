import React, { useState } from 'react';
import styles from './filter.module.css';
import FilterCheck from '@/components/FilterCheck/FilterCheck';
import RangePrice from '@/components/RangePrice/RangePrice';
import searchParamsInputData from '../../../data/searchParams.json';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersData } from '@/app/book/[id]/page.types';

const Filter = ({ filtersData }: {filtersData: FiltersData | undefined}) => {
    const [searchParamsInput, setSearchParamsInput] = useState(searchParamsInputData);
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateURL = (updates: {[key: string]: string | undefined;}) => {
        if (searchParams) {
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            Object.entries(updates).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    current.set(key, value);
                } else {
                    current.delete(key);
                }
            });
            const search = current.toString();
            const query = search ? `?${search}` : "";
            router.push(`${window.location.pathname}${query}`);
        }
    };
    return (
        <div className={styles.general__wrapper}>
            {filtersData && (
                <>
                    <RangePrice filtersData={filtersData} updateURL={updateURL} />
                    <FilterCheck
                        filtersData={filtersData}
                        searchParamsInput={searchParamsInput}
                        parametrSearch="authors"
                        title="Автор"
                        setSearchParamsInput={setSearchParamsInput}
                        updateURL={updateURL}
                    />
                    <FilterCheck
                        filtersData={filtersData}
                        searchParamsInput={searchParamsInput}
                        parametrSearch="languages"
                        title="Мова"
                        setSearchParamsInput={setSearchParamsInput}
                        updateURL={updateURL}
                    />
                    <FilterCheck
                        filtersData={filtersData}
                        searchParamsInput={searchParamsInput}
                        parametrSearch="publishers"
                        title="Видавництво"
                        setSearchParamsInput={setSearchParamsInput}
                        updateURL={updateURL}
                    />
                </>
            )}
        </div>
    );
};

export default Filter;
