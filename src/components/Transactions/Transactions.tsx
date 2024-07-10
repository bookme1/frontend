// "use client";
// import React from "react";

// const Transactions = () => {
//   return (
//     <>
//       <div className="ml-20 shadow-2xl rounded-lg p-5 w-auto">
//         <p className="text-center mb-2 text-green-900 font-bold">
//           Останні транзакції
//         </p>
//         <ul className="text-green-700">
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//           <li className="mb-2">
//             <div className="flex gap-10">
//               <p>ID name</p>
//               <p>11.02.2024</p>
//               <p>123,78 грн</p>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Transactions;

'use client';
import React, { useEffect, useState } from 'react';
import { useGetAllTransactionsQuery } from '@/lib/redux/features/admin/adminApi';

const Transactions = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

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

  console.log(data);

  // Сортування транзакцій за датою
  const sortedTransactions = data?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="mx-auto shadow-2xl rounded-lg" style={{ padding: '0.75rem',  maxWidth: '4xl' }}>
      <p className="text-center mb-2 text-green-900 font-bold">Останні транзакції</p>
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        <ul className="text-green-700">
          {sortedTransactions && sortedTransactions.map((transaction) => (
            <li key={transaction.id} className="mb-2">
              <div className="flex justify-between gap-10">
                <p>{transaction.id}</p>
                <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
                <p>{transaction.amount.toFixed(2)} грн</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
