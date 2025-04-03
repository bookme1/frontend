'use client';

import React, { useEffect, useState } from 'react';

import styles from './Transactions.module.css';

import { useGetAllTransactionsQuery } from '../../lib/redux/features/admin/adminApi';

const Transactions: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [amountFilter, setAmountFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('desc'); // Додаємо стан для зберігання напрямку сортування

    const { data, error, isLoading } = useGetAllTransactionsQuery('');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;

    console.log('Transactions', data);

    // Сортування транзакцій за датою (від найсвіжіших до найстаріших)
    const sortedTransactions = data
        ?.slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    // Унікальні дати для фільтрації без використання Set
    const uniqueDatesObj: { [key: string]: boolean } = {};
    sortedTransactions?.forEach(transaction => {
        const date = new Date(transaction.createdAt).toLocaleDateString();
        uniqueDatesObj[date] = true;
    });
    const uniqueDates = Object.keys(uniqueDatesObj);

    // Фільтрація транзакцій за датою та сумою
    const filteredTransactions = sortedTransactions?.filter(transaction => {
        const dateMatch = selectedDate
            ? new Date(transaction.createdAt).toLocaleDateString() ===
              selectedDate
            : true;
        const amountMatch =
            amountFilter === 'all'
                ? true
                : amountFilter === 'below200'
                  ? transaction.amount <= 200
                  : transaction.amount > 200;
        return dateMatch && amountMatch;
    });

    // Сортування транзакцій за напрямком сортування
    const sortedFilteredTransactions = filteredTransactions
        ?.slice()
        .sort((a, b) => {
            // Перевіряємо тип id та застосовуємо відповідне сортування
            if (typeof a.id === 'number' && typeof b.id === 'number') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            }
            return sortOrder === 'asc'
                ? String(a.id).localeCompare(String(b.id))
                : String(b.id).localeCompare(String(a.id));
        });

    // Функція для зміни напрямку сортування
    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder =>
            prevSortOrder === 'asc' ? 'desc' : 'asc'
        );
    };

    return (
        <div className={styles.container}>
            <p className={styles.header}>Останні транзакції</p>

            <div className={styles.scrollableList}>
                <ul className={styles.list}>
                    {/* Рядок для назв колонок */}
                    <li className={`${styles.rowHeader} mb-2`}>
                        <div className={styles.grid}>
                            <p className={styles.colSpan1}>ID</p>
                            <p className={styles.colSpan2}>Дата</p>
                            <p className={styles.colSpan2}>Сума</p>
                        </div>
                    </li>

                    {/* Рядок для фільтрів */}
                    <li className={`${styles.rowFilters} mb-2`}>
                        <div className={styles.grid}>
                            <div
                                className={`${styles.colSpan1} flex items-center`}
                            >
                                <button
                                    onClick={toggleSortOrder}
                                    className={styles.button}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>

                            <div className={styles.colSpan2}>
                                <select
                                    value={selectedDate}
                                    onChange={e =>
                                        setSelectedDate(e.target.value)
                                    }
                                    className={styles.select}
                                >
                                    <option value="">Всі дати</option>
                                    {uniqueDates.map(date => (
                                        <option key={date} value={date}>
                                            {date}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.colSpan2}>
                                <select
                                    value={amountFilter}
                                    onChange={e =>
                                        setAmountFilter(e.target.value)
                                    }
                                    className={styles.select}
                                >
                                    <option value="all">Всі</option>
                                    <option value="below200">До 200 грн</option>
                                    <option value="above200">
                                        Понад 200 грн
                                    </option>
                                </select>
                            </div>
                        </div>
                    </li>

                    {/* Рядки с транзакциями */}
                    {sortedFilteredTransactions &&
                        sortedFilteredTransactions.map(transaction => (
                            <li key={transaction.id} className={styles.rowItem}>
                                <div className={styles.grid}>
                                    <p className={styles.colSpan1}>
                                        {transaction.id}
                                    </p>
                                    <p className={styles.colSpan2}>
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                    <p
                                        className={`${styles.colSpan2} ${styles.textRight}`}
                                    >
                                        {transaction.amount.toFixed(2)} грн
                                    </p>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;
