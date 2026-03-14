import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Reviews",
        data: data.values,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#22c55e"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

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

    },

    scales: {

      x: {
        ticks: {
          color: "#9ca3af"
        },
        grid: {
          color: "rgba(255,255,255,0.04)"
        }
      },

      y: {
        ticks: {
          color: "#9ca3af"
        },
        grid: {
          color: "rgba(255,255,255,0.04)"
        }
      }

    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;