import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Scales,
  Animations,
} from "chart.js";

// import faker from 'faker';
const { faker } = require("@faker-js/faker");

const ChartIdeas = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ideas",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        borderColor: "#4EAEF7",
        backgroundColor: "#4EAEF7",
        borderWidth: 6,
        hoverBorderWidth: 15,
        // pointStyle: "circle",
        hitRadius: 9,
        tension: 0.3,
        borderJoinStyle: "round",
        pointRadius: 0,
      },
      {
        label: "Problems",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 8 })),
        borderColor: "#EEC3FD",
        backgroundColor: "#EEC3FD",
        borderWidth: 4,
        hoverBorderWidth: 15,
        // pointStyle: "rectRot",
        hitRadius: 9,
        tension: 0.3,
        borderJoinStyle: "round",
        pointRadius: 0,

      },
      {
        label: "Evolved Ideas",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
        borderColor: "#2549A8",
        backgroundColor: "#2549A8",
        borderWidth: 4,
        hoverBorderWidth: 15,
        // pointStyle: "triangle",
        pointRadius: 0,

        hitRadius: 9,
        tension: 0.3,
        borderJoinStyle: "round",

      },
      {
        label: "Implementations",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
        borderColor: "#be0081",
        backgroundColor: "#be0081",
        borderWidth: 4,
        hoverBorderWidth: 15,
        // pointStyle: "crossRot",
        hitRadius: 9,
        tension: 0.3,
        borderJoinStyle: "round",
        pointRadius: 0,

      },
    ],
  };

  return (
    <div className="w-[35em]  bg-clear-snow rounded-2xl">
      <Line
        data={chartData}
        options={{
          responsive: true,
          
          plugins: {
            title: {
              display: true,
              text: "Ideas Over Time",
              font: {
                size: 24,
                family: "Freude",
                color: "#2549A8"
            }
            },
            legend: {
              display: true,
              position: "bottom",
            },
            scales: {
                x: {
                    type: 'time',
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

export default ChartIdeas;
