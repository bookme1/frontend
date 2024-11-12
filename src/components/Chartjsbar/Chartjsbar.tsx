'use client';

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import { CategoryScale, Chart, defaults } from 'chart.js/auto';

import Sourcedata from '@/data/sourceData.json';

Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Chartjsbar = () => {
    return (
        <>
            {' '}
            <div className="flex gap-20  justify-end mr-20">
                <div className="w-6/12 h-96 shadow-2xl rounded-xl">
                    {/* <Bar
            data={{
              labels: Sourcedata.map((data) => data.label),
              datasets: [
                {
                  label: "Count",
                  data: Sourcedata.map((data) => data.value),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          />
        </div>
        <div className="w-1/4 h-96 shadow-2xl rounded-xl">
          <Doughnut
            data={{
              labels: Sourcedata.map((data) => data.label),
              datasets: [
                {
                  label: "Count",
                  data: Sourcedata.map((data) => data.value),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          /> */}
                </div>
            </div>
        </>
    );
};

export default Chartjsbar;
