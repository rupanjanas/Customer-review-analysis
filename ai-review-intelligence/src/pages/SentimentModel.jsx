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
labels: [
"Logistic Regression",
"SVM",
"Random Forest",
"XGBoost"
],
datasets: [
{
label: "Accuracy",
data: [0.82, 0.85, 0.88, 0.90],
backgroundColor: "#6366F1"
}
]
};

const rocData = {
labels: [0,0.2,0.4,0.6,0.8,1],
datasets: [
{
label:"ROC Curve",
data:[0,0.35,0.6,0.75,0.9,1],
borderColor:"#22D3EE",
fill:false
}
]
};

return (
<div className="ml-64 p-10 space-y-10">

<h1 className="text-3xl font-bold">
Sentiment Prediction Model
</h1>

<p className="text-gray-300 max-w-3xl">
Customer reviews are classified into positive, negative, and neutral
sentiments using supervised machine learning models trained on labeled
review data.
</p>

{/* Model Comparison */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
Model Accuracy Comparison
</h2>

<Bar data={accuracyData} />

</div>

{/* ROC Curve */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
ROC Curve
</h2>

<Line data={rocData} />

</div>

{/* Confusion Matrix */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
Confusion Matrix
</h2>

<div className="grid grid-cols-3 gap-4 text-center">

<div className="bg-green-500 p-6 rounded-lg">
True Positive
<br/>
320
</div>

<div className="bg-yellow-500 p-6 rounded-lg">
False Positive
<br/>
45
</div>

<div className="bg-gray-500 p-6 rounded-lg">
False Negative
<br/>
38
</div>

<div className="bg-red-500 p-6 rounded-lg">
True Negative
<br/>
297
</div>

</div>

</div>

{/* Metrics Table */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
Evaluation Metrics
</h2>

<table className="w-full text-left">

<thead>

<tr className="text-gray-400 border-b border-gray-700">

<th className="p-2">Metric</th>
<th className="p-2">Score</th>

</tr>

</thead>

<tbody>

<tr className="border-b border-gray-700">

<td className="p-2">Accuracy</td>
<td className="p-2">0.90</td>

</tr>

<tr className="border-b border-gray-700">

<td className="p-2">Precision</td>
<td className="p-2">0.88</td>

</tr>

<tr className="border-b border-gray-700">

<td className="p-2">Recall</td>
<td className="p-2">0.87</td>

</tr>

<tr>

<td className="p-2">F1 Score</td>
<td className="p-2">0.88</td>

</tr>

</tbody>

</table>

</div>

</div>
);
};

export default SentimentModel;