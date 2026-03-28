import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Reviews",
        data: data.values,
        backgroundColor: "#22c55e",   // green instead of default blue
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb"             // white legend text
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
          color: "#9ca3af",            // visible x-axis labels
          maxRotation: 30,             // slight angle so long names don't overlap
          font: { size: 11 }
        },
        grid: {
          color: "rgba(255,255,255,0.04)"
        }
      },
      y: {
        ticks: {
          color: "#9ca3af"             // visible y-axis numbers
        },
        grid: {
          color: "rgba(255,255,255,0.04)"
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;