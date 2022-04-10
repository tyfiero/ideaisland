import React, { useEffect, useState } from "react";
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
  const [color, setColor] = useState("hsla(206,91%,64%,1)");
const [color2, setColor2] = useState("hsla(224,64%,40%,1)");
const [color3, setColor3] = useState(" hsla(319,100%,37%,1)");
const [color4, setColor4] = useState("hsla(284,94%,88%,1)");
  useEffect(() => {
    let blobc1 = localStorage.getItem("blob1") || "hsla(206,91%,64%,1)";
      let blobc2 = localStorage.getItem("blob2") || "hsla(224,64%,40%,1)";
      let blobc3 = localStorage.getItem("blob3") || " hsla(319,100%,37%,1)";
      let blobc4 = localStorage.getItem("blob4") || "hsla(284,94%,88%,1)";
  setColor(blobc1);
  setColor2(blobc2);
  setColor3(blobc3);
  setColor4(blobc4);
      
  },[]);


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
        borderColor: color,
        backgroundColor: color,
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
        borderColor: color4,
        backgroundColor: color4,
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
        borderColor: color2,
        backgroundColor: color2,
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
        borderColor: color3,
        backgroundColor: color3,
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
                color: color2,
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
