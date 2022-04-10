import React, { useEffect, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const [color, setColor] = useState("hsla(206,91%,64%,1)");
  const [color2, setColor2] = useState("hsla(224,64%,40%,1)");
  const [color3, setColor3] = useState(" hsla(319,100%,37%,1)");
  const [color4, setColor4] = useState("hsla(284,94%,88%,1)");
  const [color5, setColor5] = useState("hsla(178,100%,50%,1)");

    useEffect(() => {
      let blobc1 = localStorage.getItem("blob1") || "hsla(206,91%,64%,1)";
        let blobc2 = localStorage.getItem("blob2") || "hsla(224,64%,40%,1)";
        let blobc3 = localStorage.getItem("blob3") || " hsla(319,100%,37%,1)";
        let blobc4 = localStorage.getItem("blob4") || "hsla(284,94%,88%,1)";
  let blobc5 = localStorage.getItem("blob5") || "hsla(178,100%,50%,1)";

    setColor(blobc1);
    setColor2(blobc2);
    setColor3(blobc3);
    setColor4(blobc4);
    setColor5(blobc5);

        
    },[]);


  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    datasets: [
      {
        label: "# of Ideas",
        data: [18, 12, 7, 5, 2],
        backgroundColor: [
          color3,
          color4,
          color2,
          color,
          color5,

        ],
        borderColor: [
          color3,
          color4,
          color2,
          color,
          color5,
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
