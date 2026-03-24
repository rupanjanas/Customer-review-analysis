const Methodology = () => {
  return (
<div className="bg-[#020617]">
<div className="ml-16 p-10 text-white  min-h-screen space-y-12">

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-400">
System Methodology
</h1>

<p className="text-gray-400 max-w-3xl">
Our AI-powered system processes customer reviews through multiple
stages including preprocessing, embeddings, clustering, sentiment analysis,
and business intelligence generation.
</p>

{/* PIPELINE FLOW */}

<div className="space-y-6">

<h2 className="text-xl text-green-400">
Processing Pipeline
</h2>

<div className="flex flex-wrap items-center gap-4">

{[
"Raw Reviews",
"Text Cleaning",
"Embeddings",
"Clustering",
"Profiling",
"Sentiment",
"Insights"
].map((step, index) => (

<div key={index} className="flex items-center gap-4">

<div className="bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-lg hover:border-green-400 transition ">
{step}
</div>

{index < 6 && (
<span className="text-green-400 text-xl">→</span>
)}

</div>

))}

</div>

</div>

{/* DETAILED STEPS */}

<div>

<h2 className="text-xl text-green-400 mb-6">
Detailed Process
</h2>

<div className="grid grid-cols-3 gap-8">

{/* CARD */}

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
1. Text Preprocessing
</h3>

<p className="text-gray-300 text-sm">
Cleaning reviews by removing noise, punctuation, and stopwords
to improve model performance.
</p>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
2. Sentence Embeddings
</h3>

<p className="text-gray-300 text-sm">
Convert text into vector representations using transformer models.
</p>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
3. Dimensionality Reduction
</h3>

<p className="text-gray-300 text-sm">
UMAP reduces high-dimensional vectors for clustering and visualization.
</p>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
4. Customer Segmentation
</h3>

<p className="text-gray-300 text-sm">
KMeans, DBSCAN and GMM group similar customer behaviors.
</p>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
5. Sentiment Classification
</h3>

<p className="text-gray-300 text-sm">
Supervised ML models classify sentiment into positive, negative, neutral.
</p>

</div>

<div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">

<h3 className="font-bold mb-2 text-green-400">
6. Business Intelligence
</h3>

<p className="text-gray-300 text-sm">
Insights are transformed into actionable recommendations for businesses.
</p>

</div>

</div>

</div>

</div>
</div>

  );
};

export default Methodology;