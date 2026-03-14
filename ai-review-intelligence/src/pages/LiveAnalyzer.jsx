import { useState } from "react";

const LiveAnalyzer = () => {

const [review,setReview] = useState("")
const [result,setResult] = useState(null)

const analyze = async () => {

const res = await fetch("http://localhost:5000/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({review})
})

const data = await res.json()
setResult(data)

}

return (

<div className="ml-64 p-10">

<h1 className="text-3xl font-bold mb-8">
Live Review Analyzer
</h1>

<textarea
className="w-full bg-card p-4 rounded-xl"
rows="4"
placeholder="Enter customer review..."
value={review}
onChange={(e)=>setReview(e.target.value)}
/>

<button
onClick={analyze}
className="mt-4 bg-accent px-6 py-2 rounded-lg"
>
Analyze
</button>

{result && (

<div className="mt-8 bg-card p-6 rounded-xl">

<p>Sentiment: {result.sentiment}</p>
<p>Cluster: {result.cluster}</p>
<p>Issue: {result.issue}</p>

</div>

)}

</div>

)

}

export default LiveAnalyzer