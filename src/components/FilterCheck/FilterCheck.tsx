import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import styles from './filterCheck.module.css';
import { FilterCheckProps } from './filterCheck.types.ts';
import { FiltersData } from '@/app/book/[id]/page.types';

import { Icon } from '../common/Icon';

export default function FilterCheck({
    filtersData,
    searchParamsInput,
    setSearchParamsInput,
    parametrSearch,
    title,
    updateURL,
}: FilterCheckProps) {
    const searchParams = useSearchParams();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const currentParamValue = searchParams?.get(parametrSearch);
        setSelectedItems(currentParamValue ? currentParamValue.split(',') : []);
    }, [searchParams, parametrSearch]);

    const filterSearchInput = (data: FiltersData) => {
        return data[parametrSearch].filter((element: string) =>
            element
                .toLocaleLowerCase()
                .includes(
                    searchParamsInput[parametrSearch].search.toLocaleLowerCase()
                )
        );
    };

    const handleCheckboxChange = (item: string) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                return prevItems.filter(i => i !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };

    const isChecked = (item: string) => {
        return selectedItems.includes(item);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateURL({ [parametrSearch]: selectedItems.join(',') });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.inputs__wrapper}>
            <h2 className={styles.title__filter}>{title}</h2>
            {filtersData && filtersData[parametrSearch].length > 5 && (
                <label className={styles.search} htmlFor={title}>
                    <input
                        id={title}
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
                            type="button"
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
                                    <input
                                        aria-label='Checkbox'
                                        type="checkbox"
                                        checked={isChecked(item)}
                                        onChange={() =>
                                            handleCheckboxChange(item)
                                        }
                                    />
                                <p>{item}</p>
                            </li>
                        ))}
            </ul>
            {searchParamsInput[parametrSearch].more < 10 &&
                filtersData &&
                filterSearchInput(filtersData).length > 5 && (
                    <button
                        type="button"
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
            <button type="submit">OK</button>
        </form>
    );
}
