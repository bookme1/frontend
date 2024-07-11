
'use client';

import React, { useEffect, useState } from 'react';
import { useGetAllTransactionsQuery } from '@/lib/redux/features/admin/adminApi';

const Transactions = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [amountFilter, setAmountFilter] = useState<string>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  const { data, error, isLoading } = useGetAllTransactionsQuery(accessToken, {
    skip: accessToken === null,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  console.log('Transactions', data);

  // Сортування транзакцій за датою (від найсвіжіших до найстаріших)
  const sortedTransactions = data?.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Унікальні дати для фільтрації
  const uniqueDates = Array.from(new Set(sortedTransactions?.map(transaction => new Date(transaction.createdAt).toLocaleDateString())));

  // Фільтрація транзакцій за датою та сумою
  const filteredTransactions = sortedTransactions?.filter(transaction => {
    const dateMatch = selectedDate ? new Date(transaction.createdAt).toLocaleDateString() === selectedDate : true;
    const amountMatch = amountFilter === 'all'
      ? true
      : amountFilter === 'below200'
        ? transaction.amount <= 200
        : transaction.amount > 200;
    return dateMatch && amountMatch;
  });

  return (
    <div className="mx-auto shadow-2xl rounded-lg" style={{ padding: '0.75rem', maxWidth: '4xl' }}>
      <p className="text-center mb-2 text-green-900 font-bold">Останні транзакції</p>

      <div className="overflow-auto" style={{ maxHeight: '360px', padding: '15px' }}>
        <ul className="text-green-700">
          <li className="mb-2">
            <div className="flex justify-between gap-10">
              <div className="flex-1">
                <label className="mr-2">ID</label>
              </div>
              <div className="flex-1">
                <label className="mr-2">За датою:</label>
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                  <option value="">Всі дати</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="mr-2">За сумою:</label>
                <select value={amountFilter} onChange={e => setAmountFilter(e.target.value)}>
                  <option value="all">Всі</option>
                  <option value="below200">До 200 грн</option>
                  <option value="above200">Понад 200 грн</option>
                </select>
              </div>
            </div>
          </li>
          {filteredTransactions && filteredTransactions.map((transaction) => (
            <li key={transaction.id} className="mb-2">
              <div className="flex justify-between gap-10">
                <div className="flex-1">
                  <p>{transaction.id}</p>
                </div>
                <div className="flex-1">
                  <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex-1">
                  <p>{transaction.amount.toFixed(2)} грн</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;