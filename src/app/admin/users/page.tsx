'use client';

import { Headerstatistics } from '@/components/Headerstatistics';
import { Webstatistics } from '@/components/Webstatistics';
import AdminUserTable from '@/components/table/AdminUserTable'; // Імпорт нового компоненту

export default function Home() {
  return (
    <>
      <Headerstatistics />
      <div className="flex flex-row mt-10">
        <Webstatistics />
        <AdminUserTable />
      </div>
    </>
  );
}
