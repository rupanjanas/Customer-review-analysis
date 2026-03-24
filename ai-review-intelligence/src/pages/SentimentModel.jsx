import { Bar, Line } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
Tooltip,
Legend
);

const SentimentModel = () => {

const accuracyData = {
labels: ["Logistic Regression","SVM","Random Forest","XGBoost"],
datasets: [
{
label: "Accuracy",
data: [0.82, 0.85, 0.88, 0.90],
backgroundColor: "#22c55e"
}
]
};

const rocData = {
labels: [0,0.2,0.4,0.6,0.8,1],
datasets: [
{
label:"ROC Curve",
data:[0,0.35,0.6,0.75,0.9,1],
borderColor:"#22c55e",
backgroundColor:"rgba(34,197,94,0.15)",
tension:0.4,
fill:true
}
]
};

const prData = {
labels:["Precision","Recall","F1 Score"],
datasets:[
{
label:"Score",
data:[0.88,0.87,0.88],
backgroundColor:"#14b8a6"
}
]
};

const chartOptions = {

plugins:{
legend:{
labels:{color:"#e5e7eb"}
}
},

scales:{
x:{
ticks:{color:"#9ca3af"},
grid:{color:"rgba(255,255,255,0.04)"}
},
y:{
ticks:{color:"#9ca3af"},
grid:{color:"rgba(255,255,255,0.04)"}
}
}

};

return (
<div className=" bg-[#020617]">
<div className=" ml-16 p-10 text-white  min-h-screen space-y-10">

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-400">
Sentiment Prediction Model
</h1>

<p className="text-gray-400 max-w-3xl">
Customer reviews are classified into positive, negative, and neutral
sentiments using supervised machine learning models trained on labeled data.
</p>

{/* MODEL COMPARISON */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Model Accuracy Comparison
</h2>

<Bar data={accuracyData} options={chartOptions}/>

</div>

{/* ROC */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
ROC Curve
</h2>

<Line data={rocData} options={chartOptions}/>

</div>

{/* PRECISION / RECALL */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Precision / Recall / F1
</h2>

<Bar data={prData} options={chartOptions}/>

</div>

{/* CONFUSION MATRIX */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-6 text-green-400">
Confusion Matrix
</h2>

<div className="grid grid-cols-2 gap-4 text-center">

<div className="bg-green-500/20 border border-green-500 p-6 rounded-lg">
<p className="text-green-400">True Positive</p>
<p className="text-2xl font-bold">320</p>
</div>

<div className="bg-yellow-500/20 border border-yellow-500 p-6 rounded-lg">
<p className="text-yellow-400">False Positive</p>
<p className="text-2xl font-bold">45</p>
</div>

<div className="bg-red-500/20 border border-red-500 p-6 rounded-lg">
<p className="text-red-400">False Negative</p>
<p className="text-2xl font-bold">38</p>
</div>

<div className="bg-blue-500/20 border border-blue-500 p-6 rounded-lg">
<p className="text-blue-400">True Negative</p>
<p className="text-2xl font-bold">297</p>
</div>

</div>

</div>

{/* METRICS TABLE */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Evaluation Metrics
</h2>

<table className="w-full text-left">

<thead>
<tr className="text-gray-400 border-b border-white/10">
<th className="p-2">Metric</th>
<th className="p-2">Score</th>
</tr>
</thead>

<tbody className="text-gray-300">

<tr className="border-b border-white/10">
<td className="p-2">Accuracy</td>
<td className="p-2 text-green-400">0.90</td>
</tr>

<tr className="border-b border-white/10">
<td className="p-2">Precision</td>
<td className="p-2 text-green-400">0.88</td>
</tr>

<tr className="border-b border-white/10">
<td className="p-2">Recall</td>
<td className="p-2 text-green-400">0.87</td>
</tr>

<tr>
<td className="p-2">F1 Score</td>
<td className="p-2 text-green-400">0.88</td>
</tr>

</tbody>

</table>

</div>

</div>
</div>

);

};

export default SentimentModel;