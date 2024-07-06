'use client';

import { useEffect, useState } from 'react';

import { ChartStyle } from '@/app/admin/page.style';
import { Chartjs } from '@/components/Chartjs';
import { Chartjsbr } from '@/components/Chartjsbar';
import { Headerstatistics } from '@/components/Headerstatistics';
import { Transactions } from '@/components/Transactions';
import { Webdata } from '@/components/Webdata';
import { Webstatistics } from '@/components/Webstatistics';
import { useGetUserStatisticQuery } from '@/lib/redux/features/admin/adminApi';

export default function Home() {
  // ЕДУАРД. Стягування статистики по кліентам на сайті.
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Перевірка чи загрузився сайт
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

  console.log('RENDER');
  console.log(data);

  return (
    <>
      <Headerstatistics />
      <div className="flex flex-row mt-10">
        <Webstatistics />
        <div className="w-auto h-auto">
          <Webdata />
          <div className="mt-10 w-auto h-auto items-start">
            <Chartjs />
          </div>
        </div>
        <Transactions />
      </div>
      <ChartStyle className="mt-10 ml-20 mb-10  ">
        <Chartjsbr />
      </ChartStyle>
    </>
  );
}
