import { useState } from 'react';

import styles from './filter.module.css';
import { FiltersData } from '@/app/book/[id]/page.types';
import FilterCheck from '@/components/FilterCheck/FilterCheck';
import RangePrice from '@/components/RangePrice/RangePrice';

import searchParamsInputData from '../../../data/searchParams.json';

const Filter = ({
    filtersData,
    updateURL,
}: {
    filtersData: FiltersData | undefined | null;
    updateURL: (updates: { [key: string]: string | undefined }) => void;
}) => {
    const [searchParamsInput, setSearchParamsInput] = useState(
        searchParamsInputData
    );

    return (
        <div className={styles.general__wrapper}>
            {filtersData && (
                <>
                    <RangePrice
                        filtersData={filtersData}
                        updateURL={updateURL}
                    />
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
