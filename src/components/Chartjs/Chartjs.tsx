'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, defaults } from 'chart.js/auto';

Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Chartjs = ({ statistics }: { statistics: { x: string, y: number }[] }) => {
  // Функція для перевірки та конвертації дати
  const parseDate = (dateString: string): number => {
    const [day, month] = dateString.split('.');
    const year = new Date().getFullYear(); // поточний рік
    const parsedDate = new Date(year, parseInt(month) - 1, parseInt(day)); // місяці в JavaScript починаються з 0
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.getTime();
    } else {
      console.error(`Invalid date format: ${dateString}`);
      return 0;
    }
  };

  // Сортування статистики за датами (по осі Х)
  const sortedStatistics = statistics.slice().sort((a, b) => parseDate(a.x) - parseDate(b.x));

  // Вивід користувачів в консоль
  console.log('Original Statistics:', statistics);
  console.log('Sorted Statistics:', sortedStatistics);

  const chartData = {
    labels: sortedStatistics.map(point => point.x),
    datasets: [
      {
        label: 'Statistics',
        data: sortedStatistics.map(point => point.y),
        borderColor: 'rgba(75, 192, 192, 0.2)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
      },
    ],
  };

  // Вивід даних, які передаються в графік
  console.log('Chart Data:', chartData);

  return (
    <div className="flex-col ml-40">
      <div className="h-96 w-full shadow-2xl rounded-xl mb-10">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Chartjs;