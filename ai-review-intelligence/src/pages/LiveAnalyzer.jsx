import { useState } from "react";

const LiveAnalyzer = () => {

const [review,setReview] = useState("");
const [result,setResult] = useState(null);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);

const analyze = async () => {

try{

setLoading(true);
setError(null);

const res = await fetch("http://localhost:5000/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({review})
});

const data = await res.json();
setResult(data);

}catch(err){
setError("Something went wrong. Please try again.");
}

finally{
setLoading(false);
}

};

return (
<div className="bg-[#020617]">
<div className="ml-16 p-10 text-white  min-h-screen space-y-8">

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-400">
Live Review Analyzer
</h1>

<p className="text-gray-400 max-w-xl">
Enter a customer review and instantly get sentiment,
customer segment, detected issues, and business insights.
</p>

{/* INPUT BOX */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl">

<textarea
className="w-full bg-black/60 border border-white/10 p-4 rounded-lg
text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
rows="4"
placeholder="Enter customer review..."
value={review}
onChange={(e)=>setReview(e.target.value)}
/>

<button
onClick={analyze}
disabled={loading || !review}
className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg
hover:bg-green-400 transition disabled:opacity-50"
>

{loading ? "Analyzing..." : "Analyze"}

</button>

</div>

{/* ERROR */}

{error && (
<div className="bg-red-500/20 border border-red-500 p-4 rounded-lg text-red-400">
{error}
</div>
)}

{/* RESULT */}

{result && (

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl space-y-4 hover:border-green-400 transition">

<h2 className="text-xl text-green-400">
Analysis Result
</h2>

<div className="grid grid-cols-2 gap-6">

<div className="bg-green-500/20 border border-green-500 p-4 rounded-lg">
<p className="text-green-400 text-sm">Sentiment</p>
<p className="text-xl font-bold">{result.sentiment}</p>
</div>

<div className="bg-blue-500/20 border border-blue-500 p-4 rounded-lg">
<p className="text-blue-400 text-sm">Cluster</p>
<p className="text-xl font-bold">{result.cluster}</p>
</div>

<div className="bg-yellow-500/20 border border-yellow-500 p-4 rounded-lg">
<p className="text-yellow-400 text-sm">Detected Issue</p>
<p className="text-lg">{result.issue}</p>
</div>

<div className="bg-purple-500/20 border border-purple-500 p-4 rounded-lg">
<p className="text-purple-400 text-sm">Business Insight</p>
<p className="text-sm">
{result.suggestion || "Improve product quality in this segment."}
</p>
</div>

</div>

</div>

)}

</div>
</div>

);

};

export default LiveAnalyzer;