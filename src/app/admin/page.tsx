'use client';

import { useEffect, useState } from 'react';
import { ChartStyle } from '@/app/admin/page.style';
import { Chartjs } from '@/components/Chartjs';
import { Chartjsbr } from '@/components/Chartjsbar';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Transactions } from '@/components/Transactions';
import { Webdata } from '@/components/Webdata';
import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable'; // Імпорт нового компоненту
import { useGetUserStatisticQuery } from '@/lib/redux/features/admin/adminApi';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  const { data, error, isLoading } = useGetUserStatisticQuery(accessToken, {
    skip: accessToken === null,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  console.log('RENDER Edd');
  console.log(data);  

  return (
    <>
      <Headerstatistics />
      <div className="flex flex-row mt-10">
        <Webstatistics />
        <div className="w-auto h-auto">
          <Webdata 
            onlineQuantity={data?.onlineQuantity || 0} 
            newUsersQuantity={data?.newUsersQuantity || 0}
            users={data?.users || 0}            
          />
          <div className="mt-10 w-auto h-auto items-start">
            {data?.statistics ? (
              <Chartjs statistics={data.statistics} />
            ) : (
              <div>No statistics available</div>
            )}
          </div>
        </div>
        <Transactions />
      </div>
      <ChartStyle className="mt-10 ml-20 mb-10">
        <Chartjsbr />
      </ChartStyle>
      <div className="mt-10">
        <AdminUserTable />
      </div>
    </>
  );
}