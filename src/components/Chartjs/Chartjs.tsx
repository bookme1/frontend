"use client";
import React from "react";
import { Chart, CategoryScale, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import Revenuedata from "@/data/revenueData.json";
Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Chartjs = () => {
  return (
    <>
      <div className="flex-col ml-40">
        <div className="h-96 w-full shadow-2xl rounded-xl mb-10">
          <Line
            data={{
              labels: Revenuedata.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: Revenuedata.map((data) => data.revenue),
                  borderColor: "rgba(255, 99, 132, 0.2)",
                  backgroundColor: "rgba(255, 159, 64, 0.2)",
                },
                {
                  label: "Cost",
                  data: Revenuedata.map((data) => data.cost),
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
