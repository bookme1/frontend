import React from 'react';

import styles from './filterCheck.module.css';
import { FilterCheckProps } from './filterCheck.types.ts';
import { FiltersData } from '@/app/book/[id]/page.types';

import { Icon } from '../common/Icon';
import { useSearchParams } from 'next/navigation';

export default function FilterCheck({
    filtersData,
    searchParamsInput,
    setSearchParamsInput,
    parametrSearch,
    title,
    updateURL
}: FilterCheckProps) {
    const searchParams = useSearchParams();
    const filterSearchInput = (data: FiltersData) => {
        return data[parametrSearch].filter((element: string) =>
            element
                .toLocaleLowerCase()
                .includes(
                    searchParamsInput[parametrSearch].search.toLocaleLowerCase()
                )
        );
    };
    const handleCheckboxChange = (item:string) => {
        const currentParamValue = searchParams?.get(parametrSearch);
        const currentItems = currentParamValue ? currentParamValue.split(',') : [];
        let newItems;
        if (currentItems.includes(item)) {
            newItems = currentItems.filter(i => i !== item);
        } else {
            newItems = [...currentItems, item];
        }
        console.log(newItems.join(','))
        updateURL({ [parametrSearch]: newItems.join(',') });
    };

    const isChecked = (item:string) => {
        const currentParamValue = searchParams?.get(parametrSearch);
        return currentParamValue ? currentParamValue.split(',').includes(item) : false;
    };
    return (
        <div className={styles.inputs__wrapper}>
            <h2 className={styles.title__filter}>{title}</h2>
            {filtersData && filtersData[parametrSearch].length > 5 && (
                <label className={styles.search}>
                    <input
                        type="text"
                        placeholder="Знайти"
                        value={searchParamsInput[parametrSearch].search}
                        onChange={e => {
                            setSearchParamsInput(prevState => ({
                                ...prevState,
                                [parametrSearch]: {
                                    ...prevState[parametrSearch],
                                    search: e.target.value,
                                },
                            }));
                        }}
                    />
                    {searchParamsInput[parametrSearch].search.length > 0 && (
                        <button
                            className={styles.button__clear}
                            onClick={() => {
                                setSearchParamsInput(prevState => ({
                                    ...prevState,
                                    [parametrSearch]: {
                                        ...prevState[parametrSearch],
                                        search: '',
                                    },
                                }));
                            }}
                        >
                            <Icon name="icon-Linear" size={24} />
                        </button>
                    )}
                </label>
            )}
            <ul className={styles.list__checkbox}>
                {filtersData &&
                    filtersData[parametrSearch] &&
                    filterSearchInput(filtersData)
                        .slice(0, searchParamsInput[parametrSearch].more)
                        .map((item: string, index: number) => (
                            <li key={index} className={styles.item__checkbox}>
                                <input type="checkbox"
                                checked={isChecked(item)}
                                    onChange={() => handleCheckboxChange(item)} />
                                <p>{item}</p>
                            </li>
                        ))}
            </ul>
            {searchParamsInput[parametrSearch].more < 10 &&
                filtersData &&
                filterSearchInput(filtersData).length > 5 && (
                    <button
                        className={styles.button__more}
                        onClick={() => {
                            setSearchParamsInput(prevState => ({
                                ...prevState,
                                [parametrSearch]: {
                                    ...prevState[parametrSearch],
                                    more: prevState[parametrSearch].more + 5,
                                },
                            }));
                        }}
                    >
                        Ще <Icon name="icon-Line-Duotone" size={24} />
                    </button>
                )}
        </div>
    );
}
