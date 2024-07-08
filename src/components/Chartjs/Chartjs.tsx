'use client';
import React from "react";
import { Chart, CategoryScale, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Chartjs = ({ statistics }) => {
  return (
    <>
      <div className="flex-col ml-40">
        <div className="h-96 w-full shadow-2xl rounded-xl mb-10">
          <Line
            data={{
              labels: statistics.map((point) => point.x),
              datasets: [
                {
                  label: "Statistics",
                  data: statistics.map((point) => point.y),
                  borderColor: "rgba(75, 192, 192, 0.2)",
                  backgroundColor: "rgba(255, 205, 86, 0.2)",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Chartjs;