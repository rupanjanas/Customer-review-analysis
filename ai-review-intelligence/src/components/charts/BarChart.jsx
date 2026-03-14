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

const BarChart = ({data}) => {

const chartData = {
labels:data.labels,
datasets:[
{
label:"Reviews",
data:data.values,
backgroundColor:"#6366F1"
}
]
}

return <Bar data={chartData} />
}

export default BarChart