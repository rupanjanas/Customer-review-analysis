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
labels: ["Electronics", "Clothing", "Home", "Beauty"],
datasets: [
{
data: [40, 25, 20, 15],
backgroundColor: [
"#22c55e",
"#14b8a6",
"#84cc16",
"#4ade80"
],
borderWidth: 0
}
]
};

const revenueImpact = {
labels: ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"],
datasets: [
{
label: "Revenue",
data: [12000, 18000, 9000, 15000],
backgroundColor: "#22c55e"
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
<div className="bg-[#020617]">
<div className="ml-16 p-10 text-white  min-h-screen space-y-10">

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-400">
Business Insights
</h1>

<p className="text-gray-400 max-w-2xl">
Transform model outputs into actionable business decisions by identifying
high-value customer segments, key problem areas, and revenue opportunities.
</p>

{/* KPI INSIGHTS */}

<div className="grid grid-cols-4 gap-6">

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
<p className="text-gray-400 text-sm">Most Valuable Segment</p>
<h2 className="text-xl font-bold text-green-400">
Electronics Enthusiasts
</h2>
</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
<p className="text-gray-400 text-sm">Highest Complaint Category</p>
<h2 className="text-xl font-bold text-red-400">
Electronics
</h2>
</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
<p className="text-gray-400 text-sm">Positive Sentiment</p>
<h2 className="text-xl font-bold text-green-400">
78%
</h2>
</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
<p className="text-gray-400 text-sm">Revenue Risk</p>
<h2 className="text-xl font-bold text-yellow-400">
Medium
</h2>
</div>

</div>

{/* CHARTS */}

<div className="grid grid-cols-2 gap-8">

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="mb-4 text-lg text-green-400">
Complaint Distribution
</h2>

<Pie data={complaintData} options={chartOptions}/>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="mb-4 text-lg text-green-400">
Revenue by Customer Segment
</h2>

<Bar data={revenueImpact} options={chartOptions}/>

</div>

</div>

{/* STRATEGIC INSIGHTS */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-6 text-green-400">
Strategic Business Insights
</h2>

<ul className="space-y-3 text-gray-300 text-sm">

<li>
Electronics category generates the highest complaint volume → priority for improvement.
</li>

<li>
Cluster 2 contributes the highest revenue → focus marketing efforts here.
</li>

<li>
Battery and durability issues are recurring → product redesign opportunity.
</li>

<li>
Improving Electronics quality can significantly increase customer retention.
</li>

<li>
Positive sentiment peaks during seasonal sales → optimize promotions timing.
</li>

</ul>

</div>

{/* RECOMMENDATIONS */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Recommended Actions
</h2>

<ul className="space-y-3 text-gray-300 text-sm">

<li>Improve battery performance in electronics products</li>
<li>Target high-value customer segments with premium offers</li>
<li>Enhance product durability for budget-conscious users</li>
<li>Align marketing campaigns with high sentiment periods</li>

</ul>

</div>

</div>
</div>

);

};

export default BusinessInsights;