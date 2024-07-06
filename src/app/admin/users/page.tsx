'use client';

import { Headerstatistics } from '@/components/Headerstatistics';
import { Webstatistics } from '@/components/Webstatistics';

export default function Home() {
  return (
    <>
      <Headerstatistics />
      <div className="flex flex-row mt-10">
        <Webstatistics />
      </div>
    </>
  );
}
