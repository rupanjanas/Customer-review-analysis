import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
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
          "#4ade80",
          "#06b6d4",
          "#3b82f6",
          "#8b5cf6"
        ],
        borderColor: "#020617",
        borderWidth: 2
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb",            // visible legend text
          font: { size: 12 },
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: "#020617",
        borderColor: "#22c55e",
        borderWidth: 1,
        titleColor: "#22c55e",
        bodyColor: "#e5e7eb",
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((context.parsed / total) * 100).toFixed(1);
            return ` ${context.label}: ${pct}%`;
          }
        }
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 12 },
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (total === 0) return "";
          const pct = ((value / total) * 100).toFixed(1);
          return pct > 5 ? `${pct}%` : ""; // hide label if slice too small
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;