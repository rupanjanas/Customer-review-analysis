import { useState } from "react";
import KpiCard from "../components/cards/KpiCard";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";

const EDADashboard = () => {

const [timeFilter,setTimeFilter] = useState("Monthly");

const ratingData = {
labels:["1","2","3","4","5"],
values:[200,400,800,1600,2200]
}

const categoryData = {
labels:["Electronics","Clothing","Home","Beauty"],
values:[3200,2100,1800,1500]
}

const trendData = {
labels:["Jan","Feb","Mar","Apr","May","Jun"],
values:[800,900,1200,1500,1700,2000]
}

const wordData = {
labels:["battery","price","quality","delivery","design"],
values:[1200,980,870,760,690]
}

return (

<div className=" p-10 text-white bg-[#020617] min-h-screen">

<h1 className="ml-16 text-3xl font-bold mb-8 text-green-400">
Exploratory Data Analysis
</h1>

{/* KPI CARDS */}

<div className="ml-16 grid grid-cols-4 gap-6 mb-10">

<KpiCard title="Total Reviews" value="12,580" />
<KpiCard title="Average Rating" value="4.2 ⭐" />
<KpiCard title="Positive Sentiment" value="78%" />
<KpiCard title="Top Category" value="Electronics" />

</div>

{/* FILTER */}

<div className="ml-16 flex justify-between items-center mb-6">

<h2 className="text-xl font-semibold text-green-400">
Review Trends
</h2>

<select
value={timeFilter}
onChange={(e)=>setTimeFilter(e.target.value)}
className="bg-black/60 border ml-16 border-white/10 px-3 py-2 rounded text-white"
>

<option>Monthly</option>
<option>Weekly</option>
<option>Daily</option>

</select>

</div>

{/* TREND */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl mb-10 hover:border-green-400 transition">

<LineChart data={trendData}/>

</div>

{/* CHART GRID */}

<div className="grid grid-cols-2 gap-8">

{/* RATING */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="mb-4 text-lg text-green-400">
Rating Distribution
</h3>

<BarChart data={ratingData}/>

</div>

{/* CATEGORY */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="mb-4 text-lg text-green-400">
Category Share
</h3>

<PieChart data={categoryData}/>

</div>

{/* WORDS */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="mb-4 text-lg text-green-400">
Top Review Keywords
</h3>

<BarChart data={wordData}/>

</div>

{/* INSIGHTS */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="mb-4 text-lg text-green-400">
Key Insights
</h3>

<ul className="text-gray-300 space-y-2 text-sm">

<li>Electronics receives the highest review volume.</li>
<li>Ratings are heavily skewed toward 4★ and 5★.</li>
<li>Battery and price appear most frequently in reviews.</li>
<li>Review volume increased steadily in recent months.</li>

</ul>

</div>

</div>

</div>

)

}

export default EDADashboard