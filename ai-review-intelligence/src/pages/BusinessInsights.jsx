import { Pie, Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
} from "chart.js";

ChartJS.register(
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
);

const BusinessInsights = () => {

const complaintData = {
labels: ["Electronics", "Clothing", "Home Appliances", "Beauty"],
datasets: [
{
label: "Complaints",
data: [40, 25, 20, 15],
backgroundColor: [
"#6366F1",
"#22D3EE",
"#F59E0B",
"#EF4444"
],
},
],
};

const revenueImpact = {
labels: ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"],
datasets: [
{
label: "Estimated Revenue ($)",
data: [12000, 18000, 9000, 15000],
backgroundColor: "#6366F1",
},
],
};

return (

<div className="ml-64 p-10">

<h1 className="text-3xl font-bold mb-10">
Business Insights
</h1>

{/* Insight Cards */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-card p-6 rounded-xl">
<p className="text-gray-400">Most Valuable Segment</p>
<h2 className="text-xl font-bold text-highlight">
Electronics Enthusiasts
</h2>
</div>

<div className="bg-card p-6 rounded-xl">
<p className="text-gray-400">Highest Complaint Category</p>
<h2 className="text-xl font-bold text-red-400">
Electronics
</h2>
</div>

<div className="bg-card p-6 rounded-xl">
<p className="text-gray-400">Positive Sentiment</p>
<h2 className="text-xl font-bold text-green-400">
78%
</h2>
</div>

<div className="bg-card p-6 rounded-xl">
<p className="text-gray-400">Revenue Risk</p>
<h2 className="text-xl font-bold text-yellow-400">
Medium
</h2>
</div>

</div>

{/* Charts */}

<div className="grid grid-cols-2 gap-10">

<div className="bg-card p-6 rounded-xl">

<h2 className="mb-4 text-xl">
Complaint Distribution
</h2>

<Pie data={complaintData} />

</div>

<div className="bg-card p-6 rounded-xl">

<h2 className="mb-4 text-xl">
Revenue Impact by Customer Segment
</h2>

<Bar data={revenueImpact} />

</div>

</div>

{/* Key Insights */}

<div className="bg-card p-6 rounded-xl mt-10">

<h2 className="text-xl mb-4">
Key Business Insights
</h2>

<ul className="list-disc ml-6 space-y-2 text-gray-300">

<li>
Electronics category generates the highest complaint volume.
</li>

<li>
Cluster 2 users contribute the highest revenue potential.
</li>

<li>
Battery issues and product durability are the most frequent complaints.
</li>

<li>
Improving product quality in Electronics could increase customer retention.
</li>

<li>
Positive sentiment spikes during seasonal sale periods.
</li>

</ul>

</div>

</div>

);

};

export default BusinessInsights;