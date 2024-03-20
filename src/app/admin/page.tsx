"use client";
import { Headerstatistics } from "@/components/Headerstatistics";
import { Webstatistics } from "@/components/Webstatistics";
import { Webdata } from "@/components/Webdata";
import { Transactions } from "@/components/Transactions";
import { Chartjs } from "@/components/Chartjs";
import { Chartjsbr } from "@/components/Chartjsbar";
import { ChartStyle } from "@/app/admin/page.style";

export default function Home() {
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
