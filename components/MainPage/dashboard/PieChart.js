import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    datasets: [
      {
        label: "# of Ideas",
        data: [18, 12, 7, 5, 2],
        backgroundColor: [
          "#be00816e",
          "#eec3fd9e",
          "#2549a86e",
          "#4EAEF76e",
          "#00fff86e",

        ],
        borderColor: [
          "#be0081",
          "#db79ff",
          "#2549a8",
          "#4EAEF7",
          "#00fff8",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[20em]  bg-clear-snow rounded-2xl p-5 ii-shadow">
      <Pie
        data={data}
        options={{
          responsive: true,

          plugins: {
            title: {
              display: true,
              text: "Idea Quality",
              font: {
                size: 24,
                family: "Freude",
              },
            },
            legend: {
              display: false,
              position: "left",
            },
            scales: {
              x: {
                type: "time",
                // min: new Date('2019-01-01').valueOf(),
                // max: new Date('2019-12-31').valueOf()
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
