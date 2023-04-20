import { Chart as ChartJs, ArcElement, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Legend);

export default function ExpensePieChart({ creditAmount, debitAmount }) {
  const data = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        data: [creditAmount, debitAmount],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const options = {};

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
        tooltips: {
          callbacks: {},
        },
      },
    },
  };

  return <Doughnut data={data} options={options}></Doughnut>;
}
