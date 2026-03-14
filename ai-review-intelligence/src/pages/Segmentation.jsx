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
{x:2,y:3},
{x:3,y:2},
{x:4,y:4},
],
backgroundColor:"#22c55e"
},

{
label:"Cluster 2",
data:[
{x:-2,y:-3},
{x:-3,y:-2},
{x:-4,y:-4}
],
backgroundColor:"#14b8a6"
},

{
label:"Cluster 3",
data:[
{x:5,y:-3},
{x:6,y:-2},
{x:7,y:-4}
],
backgroundColor:"#84cc16"
}

]
};

const clusterSizes = {

labels:["Cluster 1","Cluster 2","Cluster 3"],

datasets:[
{
label:"Customers",
data:[4200,3500,2800],
backgroundColor:[
"#22c55e",
"#14b8a6",
"#84cc16"
]
}
]

};

const chartOptions = {

plugins:{
legend:{
labels:{
color:"#e5e7eb"
}
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

<div className="ml-16 p-10 text-white bg-[#020617] min-h-screen space-y-10">

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-400">
Customer Segmentation
</h1>

<p className="text-gray-400 max-w-3xl">
Customers are grouped into clusters based on similarity in their
review patterns using unsupervised learning techniques such as
K-Means clustering and sentence embeddings.
</p>

{/* CLUSTER VISUALIZATION */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Cluster Visualization (UMAP Projection)
</h2>

<Scatter data={clusterScatter} options={chartOptions}/>

</div>

{/* CLUSTER SIZE */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h2 className="text-xl mb-4 text-green-400">
Cluster Size Distribution
</h2>

<Bar data={clusterSizes} options={chartOptions}/>

</div>

{/* CLUSTER INSIGHTS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="text-lg font-bold mb-3 text-green-400">
Cluster 1 – Electronics Lovers
</h3>

<ul className="text-gray-300 space-y-2 text-sm">

<li>Top Keywords: battery, sound, quality</li>
<li>Sentiment: Mostly Positive</li>
<li>Common Praise: Product performance</li>
<li>Common Complaint: Battery life</li>

</ul>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="text-lg font-bold mb-3 text-green-400">
Cluster 2 – Budget Buyers
</h3>

<ul className="text-gray-300 space-y-2 text-sm">

<li>Top Keywords: price, value, discount</li>
<li>Sentiment: Mixed</li>
<li>Common Praise: Affordability</li>
<li>Common Complaint: Product durability</li>

</ul>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="text-lg font-bold mb-3 text-green-400">
Cluster 3 – Quality Seekers
</h3>

<ul className="text-gray-300 space-y-2 text-sm">

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