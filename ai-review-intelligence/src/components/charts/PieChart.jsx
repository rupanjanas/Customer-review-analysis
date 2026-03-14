import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data }) => {

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "#22c55e",
          "#10b981",
          "#14b8a6",
          "#4ade80"
        ],
        borderColor: "#020617",
        borderWidth: 2
      }
    ]
  };

  const options = {

    plugins: {

      legend: {
        labels: {
          color: "#e5e7eb",
          font: {
            size: 12
          }
        }
      },

      tooltip: {
        backgroundColor: "#020617",
        borderColor: "#22c55e",
        borderWidth: 1,
        titleColor: "#22c55e",
        bodyColor: "#e5e7eb"
      }

    }

  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;