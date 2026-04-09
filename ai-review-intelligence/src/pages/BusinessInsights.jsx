import { Pie, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const BusinessInsights = () => {
  const [recommendationData, setRecommendationData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/categories");
        const data = await res.json();
        setCategoriesData(data.categories || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSegment("");
    setRecommendationData(null);
    setError("");
  };

  const handleSegmentChange = (e) => {
    setSelectedSegment(e.target.value);
    setError("");
  };

  const selectedCategoryObj = categoriesData.find(
    (c) => c.display_name === selectedCategory
  );
  const segments = selectedCategoryObj?.super_clusters || [];

  const fetchRecommendations = async () => {
    if (!selectedCategory || !selectedSegment) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/recommendations/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(selectedSegment)}`
      );
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.detail || "Failed to load insights.");
        setRecommendationData(null);
        return;
      }
      const data = await res.json();
      setRecommendationData(data);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const complaintData = {
    labels: Object.keys(recommendationData?.sentiment_distribution || {}),
    datasets: [
      {
        data: Object.values(recommendationData?.sentiment_distribution || {}),
        backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
        borderWidth: 0
      }
    ]
  };


  const pieOptions = {
    plugins: {
      legend: {
        labels: { color: "#e5e7eb" }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
            return ` ${context.label}: ${pct}%`;
          }
        }
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 13 },
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (total === 0) return "";
          return ((value / total) * 100).toFixed(1) + "%";
        }
      }
    }
  };

  return (
    <div className="bg-[#020617]">
      <div className="ml-16 p-10 text-white min-h-screen space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400">Business Insights</h1>
        <p className="text-gray-400 max-w-2xl">
          Transform model outputs into actionable business decisions by identifying
          high-value customer segments, key problem areas, and revenue opportunities.
        </p>

        {/* SELECTORS */}
        <div className="bg-black/40 p-6 rounded-xl border space-y-4">

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-black text-white p-2 w-full rounded"
          >
            <option value="" disabled>
              {categoriesData.length === 0 ? "Loading categories..." : "Select Category"}
            </option>
            {categoriesData.map((cat, i) => (
              <option key={i} value={cat.display_name}>
                {cat.display_name}
              </option>
            ))}
          </select>

          <select
            value={selectedSegment}
            onChange={handleSegmentChange}
            className="bg-black text-white p-2 w-full rounded"
            disabled={!selectedCategory}
          >
            <option value="" disabled>
              {!selectedCategory ? "Select a category first" : "Select Segment"}
            </option>
            {segments.map((seg, i) => (
              <option key={i} value={seg.super_cluster_name}>
                {seg.super_cluster_name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchRecommendations}
            disabled={!selectedCategory || !selectedSegment || loading}
            className="bg-green-500 px-4 py-2 rounded text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load Insights"}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {recommendationData && (
          <>
            {/* KPI CARDS */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
                <p className="text-gray-400 text-sm">Selected Segment</p>
                <h2 className="text-xl font-bold text-green-400">{recommendationData.segment}</h2>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
                <p className="text-gray-400 text-sm">Category</p>
                <h2 className="text-xl font-bold text-blue-400">
                  {recommendationData.category.replace(/_/g, " ")}
                </h2>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <h2 className="text-xl font-bold text-green-400">{recommendationData.total_reviews}</h2>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
                <p className="text-gray-400 text-sm">Overall Health</p>
                <h2 className={`text-xl font-bold capitalize ${
                  recommendationData.overall_health === "positive" ? "text-green-400"
                  : recommendationData.overall_health === "negative" ? "text-red-400"
                  : "text-yellow-400"
                }`}>
                  {recommendationData.overall_health}
                </h2>
              </div>
            </div>

            {/* PIE CHART */}
           {/* PIE CHART */}
<div className="flex justify-center">
  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition w-96">
    <h2 className="mb-4 text-lg text-green-400 text-center">Sentiment Distribution</h2>
    <Pie data={complaintData} options={pieOptions} />
  </div>
</div>

            {/* STRATEGIC INSIGHTS */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-6 text-green-400">Strategic Business Insights</h2>
              <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
                {recommendationData.opportunities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* RISK FLAGS */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-red-400 transition">
              <h2 className="text-xl mb-6 text-red-400">Risk Flags</h2>
              <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
                {recommendationData.risk_flags?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-4 text-green-400">Recommended Actions</h2>
              <ul className="space-y-3 text-gray-300 text-sm">
                {recommendationData.recommendations?.map((rec, i) => (
                  <li key={i}>
                    <b>{rec.action}</b> — {rec.rationale}
                    <br />
                    <span className="text-xs text-gray-400">
                      Priority: {rec.priority} | Impact: {rec.impact} | Urgency: {rec.urgency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default BusinessInsights;