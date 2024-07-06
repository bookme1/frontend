import React, { useEffect, useState } from 'react';

import styles from './filter.module.css';
import { Icon } from '@/components/common/Icon';
import { useGetFiltersQuery } from '@/lib/redux/features/book/bookApi';

const Filter = () => {
  const { data: filtersData } = useGetFiltersQuery('');

  useEffect(() => {
    console.log('Filters');
    console.log(filtersData);
  }, [filtersData]);

  return (
    <div className={styles.general__wrapper}>
      <div className={styles.inputs__wrapper}>
        <h2 className={styles.title__filter}>Автор</h2>
        <label className={styles.search}>
          <input type="text" />
          <Icon
            name="icon-Linear"
            width={24}
            height={24}
            style={{ position: 'absolute', right: '24px', top: '12px' }}
          />
        </label>
        <ul className={styles.list__checkbox}>
          {filtersData &&
            filtersData.authors &&
            filtersData.authors
              .slice(0, 5)
              .map((item: string, index: number) => (
                <li key={index} className={styles.item__checkbox}>
                  <input type="checkbox" />
                  <label>{item}</label>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
