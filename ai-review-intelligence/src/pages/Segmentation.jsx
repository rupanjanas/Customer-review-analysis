import { Bar, Scatter } from "react-chartjs-2";
import {
Chart as ChartJS,
LinearScale,
PointElement,
Tooltip,
Legend,
CategoryScale,
BarElement
} from "chart.js";

ChartJS.register(
LinearScale,
PointElement,
Tooltip,
Legend,
CategoryScale,
BarElement
);

const Segmentation = () => {

const clusterScatter = {
datasets: [
{
label: "Cluster 1",
data: [
{x: 2, y: 3},
{x: 3, y: 2},
{x: 4, y: 4},
],
backgroundColor: "#6366F1",
},

{
label: "Cluster 2",
data: [
{x: -2, y: -3},
{x: -3, y: -2},
{x: -4, y: -4},
],
backgroundColor: "#22D3EE",
},

{
label: "Cluster 3",
data: [
{x: 5, y: -3},
{x: 6, y: -2},
{x: 7, y: -4},
],
backgroundColor: "#F59E0B",
},
],
};

const clusterSizes = {
labels: ["Cluster 1", "Cluster 2", "Cluster 3"],
datasets: [
{
label: "Number of Customers",
data: [4200, 3500, 2800],
backgroundColor: ["#6366F1", "#22D3EE", "#F59E0B"],
},
],
};

return (
<div className="ml-64 p-10 space-y-10">

<h1 className="text-3xl font-bold">
Customer Segmentation
</h1>

<p className="text-gray-300 max-w-3xl">
Customers are grouped into clusters based on similarity in their
review patterns using unsupervised learning techniques such as
K-Means clustering and sentence embeddings.
</p>

{/* Cluster Visualization */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
Cluster Visualization (UMAP Projection)
</h2>

<Scatter data={clusterScatter} />

</div>

{/* Cluster Size */}

<div className="bg-card p-6 rounded-xl">

<h2 className="text-xl mb-4">
Cluster Size Distribution
</h2>

<Bar data={clusterSizes} />

</div>

{/* Cluster Insights */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-card p-6 rounded-xl">

<h3 className="text-lg font-bold mb-3">
Cluster 1 – Electronics Lovers
</h3>

<ul className="text-gray-400 space-y-2">

<li>Top Keywords: battery, sound, quality</li>
<li>Sentiment: Mostly Positive</li>
<li>Common Praise: Product performance</li>
<li>Common Complaint: Battery life</li>

</ul>

</div>

<div className="bg-card p-6 rounded-xl">

<h3 className="text-lg font-bold mb-3">
Cluster 2 – Budget Buyers
</h3>

<ul className="text-gray-400 space-y-2">

<li>Top Keywords: price, value, discount</li>
<li>Sentiment: Mixed</li>
<li>Common Praise: Affordability</li>
<li>Common Complaint: Product durability</li>

</ul>

</div>

<div className="bg-card p-6 rounded-xl">

<h3 className="text-lg font-bold mb-3">
Cluster 3 – Quality Seekers
</h3>

<ul className="text-gray-400 space-y-2">

<li>Top Keywords: premium, material, design</li>
<li>Sentiment: Mostly Positive</li>
<li>Common Praise: Design quality</li>
<li>Common Complaint: High price</li>

</ul>

</div>

</div>

</div>
);
};

export default Segmentation;