import { useState, useEffect } from "react";
import { Bar, Bubble, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  ArcElement
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LinearScale, PointElement, Tooltip, Legend,
  CategoryScale, BarElement, ArcElement, ChartDataLabels
);

const CLUSTER_COLORS = [
  "#22c55e", "#14b8a6", "#84cc16", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444",
  "#ec4899", "#10b981", "#f97316", "#6366f1",
  "#a3e635", "#38bdf8"
];

const PIPELINE_STEPS = [
  {
    step: "01", title: "Text Preprocessing",
    desc: "Raw review titles and text are cleaned — lowercased, punctuation removed, stopwords filtered."
  },
  {
    step: "02", title: "Sentence Embeddings",
    desc: "SentenceTransformer (all-mpnet-base-v2) converts each review into a 768-dimensional dense vector capturing semantic meaning."
  },
  {
    step: "03", title: "UMAP Dimensionality Reduction",
    desc: "UMAP reduces 768-dim embeddings to 2D space while preserving local and global structure for clustering."
  },
  {
    step: "04", title: "Clustering Algorithms",
    desc: "Multiple algorithms evaluated: KMeans, MiniBatch KMeans, DBSCAN, Gaussian Mixture, Hierarchical Clustering."
  },
  {
    step: "05", title: "Super Cluster Mapping",
    desc: "Clusters grouped into super clusters using KMeans, named via LLM interpretation."
  },
  {
    step: "06", title: "Topic Extraction",
    desc: "BERTopic extracts dominant discussion themes within each segment per category."
  }
];

const ALGORITHMS = [
  { name: "KMeans", use: "Primary — fast, scalable, spherical clusters" },
  { name: "MiniBatch KMeans", use: "Large-scale variant for speed on high-volume data" },
  { name: "DBSCAN", use: "Density-based — detects noise and non-spherical clusters" },
  { name: "Gaussian Mixture", use: "Probabilistic soft assignments for overlapping clusters" },
  { name: "Hierarchical", use: "Agglomerative — builds interpretable cluster trees" }
];

// ─── CLIENT-SIDE CALCULATIONS ───────────────────────────────────────────────

// Positive ratio: positive / (positive + negative) — proxy for cluster quality
const getHealthScore = (sentDist) => {
  const pos = sentDist?.positive || 0;
  const neg = sentDist?.negative || 0;
  const total = pos + neg;
  return total > 0 ? parseFloat(((pos / total) * 100).toFixed(1)) : 0;
};

// Positive % of total sentiment
const getPositivePct = (sentDist) => {
  const total = Object.values(sentDist || {}).reduce((a, b) => a + b, 0);
  return total > 0 ? parseFloat((((sentDist?.positive || 0) / total) * 100).toFixed(1)) : 0;
};

// Dominant sentiment label
const getDominantSentiment = (sentDist) => {
  if (!sentDist) return "—";
  return Object.entries(sentDist).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
};

// Topic with highest positive reviews → "top compliment"
const getTopComplimentTopic = (topics) => {
  if (!topics?.length) return "—";
  return [...topics].sort(
    (a, b) => (b.sentiment_distribution?.positive || 0) - (a.sentiment_distribution?.positive || 0)
  )[0]?.topic_name || "—";
};

// Topic with highest negative reviews → "top complaint"
const getTopComplaintTopic = (topics) => {
  if (!topics?.length) return "—";
  return [...topics].sort(
    (a, b) => (b.sentiment_distribution?.negative || 0) - (a.sentiment_distribution?.negative || 0)
  )[0]?.topic_name || "—";
};

// Topic diversity — unique topic count per cluster
const getTopicDiversity = (topics) => topics?.length || 0;

// ────────────────────────────────────────────────────────────────────────────

const Segmentation = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/segments");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const segs = data.segments || [];
        setSegments(segs);
        if (segs.length > 0) setSelectedSegment(segs[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load segments.");
      } finally {
        setLoading(false);
      }
    };
    fetchSegments();
  }, []);

  // ── Chart: Bubble — x=index, y=positive%, r=scaled review count
  const bubbleData = {
    datasets: segments.map((seg, i) => ({
      label: seg.super_cluster_name,
      data: [{
        x: i,
        y: getPositivePct(seg.sentiment_distribution),
        r: Math.max(6, Math.min(28, seg.total_reviews / 1500))
      }],
      backgroundColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] + "80",
      borderColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      borderWidth: 1.5
    }))
  };

  const bubbleOptions = {
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const seg = segments[ctx.datasetIndex];
            return [
              ` ${seg.super_cluster_name}`,
              ` Reviews: ${seg.total_reviews.toLocaleString()}`,
              ` Positive: ${ctx.parsed.y}%`,
              ` Health Score: ${getHealthScore(seg.sentiment_distribution)}%`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
          callback: (val) => segments[val]?.super_cluster_name?.split(" ")[0] || ""
        },
        grid: { color: "rgba(255,255,255,0.04)" },
        title: { display: true, text: "Segment Index", color: "#6b7280" }
      },
      y: {
        min: 0, max: 100,
        ticks: { color: "#9ca3af", callback: (v) => `${v}%` },
        grid: { color: "rgba(255,255,255,0.04)" },
        title: { display: true, text: "Positive Sentiment %", color: "#6b7280" }
      }
    }
  };

  // ── Chart: Cluster sizes bar
  const clusterSizeData = {
    labels: segments.map((s) => s.super_cluster_name),
    datasets: [{
      label: "Total Reviews",
      data: segments.map((s) => s.total_reviews),
      backgroundColor: segments.map((_, i) => CLUSTER_COLORS[i % CLUSTER_COLORS.length]),
      borderRadius: 4
    }]
  };

  // ── Chart: Health score bar (client-calculated proxy for silhouette)
  const healthScoreData = {
    labels: segments.map((s) => s.super_cluster_name),
    datasets: [{
      label: "Health Score (Positive / Positive+Negative %)",
      data: segments.map((s) => getHealthScore(s.sentiment_distribution)),
      backgroundColor: segments.map((s) => {
        const score = getHealthScore(s.sentiment_distribution);
        return score >= 70 ? "#22c55e" : score >= 40 ? "#facc15" : "#ef4444";
      }),
      borderRadius: 4
    }]
  };

  // ── Chart: Topic diversity bar
  const topicDiversityData = {
    labels: segments.map((s) => s.super_cluster_name),
    datasets: [{
      label: "Unique Topics",
      data: segments.map((s) => getTopicDiversity(s.topics)),
      backgroundColor: "#6366f1",
      borderRadius: 4
    }]
  };

  const baseChartOptions = {
    plugins: {
      legend: { labels: { color: "#e5e7eb" } },
      datalabels: { display: false }
    },
    scales: {
      x: { ticks: { color: "#9ca3af", maxRotation: 35, font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.04)" } }
    }
  };

  // ── Selected segment pie chart
  const selectedSentimentPie = selectedSegment ? {
    labels: Object.keys(selectedSegment.sentiment_distribution || {}).map(
      (k) => k.charAt(0).toUpperCase() + k.slice(1)
    ),
    datasets: [{
      data: Object.values(selectedSegment.sentiment_distribution || {}),
      backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
      borderColor: "#020617",
      borderWidth: 2
    }]
  } : null;

  const pieOptions = {
    plugins: {
      legend: { position: "bottom", labels: { color: "#e5e7eb", font: { size: 11 }, padding: 12 } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
            return ` ${ctx.label}: ${pct}%`;
          }
        }
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 11 },
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (total === 0) return "";
          const pct = ((value / total) * 100).toFixed(1);
          return parseFloat(pct) > 5 ? `${pct}%` : "";
        }
      }
    }
  };

  // ── Selected segment topic bar
  const selectedTopicBar = selectedSegment ? {
    labels: (selectedSegment.topics || []).map((t) => t.topic_name),
    datasets: [{
      label: "Reviews",
      data: (selectedSegment.topics || []).map((t) => t.review_count),
      backgroundColor: (selectedSegment.topics || []).map((_, i) =>
        CLUSTER_COLORS[i % CLUSTER_COLORS.length]
      ),
      borderRadius: 4
    }]
  } : null;

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen flex items-center justify-center">
        <p className="text-green-400 text-xl animate-pulse">Loading segmentation data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#020617] min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#020617]">
      <div className="ml-16 p-10 text-white min-h-screen space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400">Customer Segmentation</h1>
        <p className="text-gray-400 max-w-3xl">
          Customers are grouped into segments based on review patterns using sentence embeddings,
          UMAP dimensionality reduction, and multiple clustering algorithms.
        </p>

        {/* ── MODEL PIPELINE ───────────────────────────── */}
       

        {/* ── ALGORITHMS ───────────────────────────────── */}
       

        {/* ── CLUSTER VISUALIZATIONS ───────────────────── */}
      

        {/* Cluster size */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h2 className="text-xl mb-1 text-green-400">Cluster Size Distribution</h2>
          <p className="text-xs text-gray-500 mb-4">Total reviews per customer segment</p>
          <Bar data={clusterSizeData} options={baseChartOptions} />
        </div>

        {/* Health score — proxy for silhouette */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h2 className="text-xl mb-1 text-green-400">Cluster Health Score</h2>
          <p className="text-xs text-gray-500 mb-4">
            Computed as: positive / (positive + negative) × 100 per segment.
            Green ≥70%, Yellow 40–70%, Red &lt;40%. Proxy for cluster sentiment quality.
          </p>
          <Bar data={healthScoreData} options={baseChartOptions} />
        </div>

        {/* Topic diversity */}
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h2 className="text-xl mb-1 text-green-400">Topic Diversity per Segment</h2>
          <p className="text-xs text-gray-500 mb-4">
            Number of unique topics extracted per cluster via BERTopic
          </p>
          <Bar data={topicDiversityData} options={baseChartOptions} />
        </div>

        {/* ── CLUSTER INTELLIGENCE ─────────────────────── */}
        <h2 className="text-2xl font-bold text-green-400">Cluster Intelligence</h2>

        {/* Segment selector tabs */}
        <div className="flex flex-wrap gap-2">
          {segments.map((seg, i) => (
            <button
              key={seg.sc_key}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                selectedSegment?.sc_key === seg.sc_key
                  ? "border-green-400 bg-green-400/10 text-green-400"
                  : "border-white/10 text-gray-400 hover:border-green-400/50 hover:text-green-400"
              }`}
            >
              {seg.super_cluster_name}
            </button>
          ))}
        </div>

        {/* Selected segment detail panel */}
        {selectedSegment && (() => {
          const idx = segments.findIndex((s) => s.sc_key === selectedSegment.sc_key);
          const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];
          const topTopics = [...(selectedSegment.topics || [])]
            .sort((a, b) => b.review_count - a.review_count)
            .slice(0, 5);
          const compliment = getTopComplimentTopic(selectedSegment.topics);
          const complaint = getTopComplaintTopic(selectedSegment.topics);
          const dominant = getDominantSentiment(selectedSegment.sentiment_distribution);
          const healthScore = getHealthScore(selectedSegment.sentiment_distribution);
          const diversity = getTopicDiversity(selectedSegment.topics);

          return (
            <div className="space-y-6">

              {/* Header */}
              <div className="border p-6 rounded-xl" style={{ borderColor: color + "60", backgroundColor: color + "0a" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">{selectedSegment.category}</p>
                    <h3 className="text-2xl font-bold mb-1" style={{ color }}>
                      {selectedSegment.super_cluster_name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {selectedSegment.total_reviews.toLocaleString()} reviews ·{" "}
                      {diversity} topics ·{" "}
                      <span className={
                        selectedSegment.overall_health === "positive" ? "text-green-400"
                        : selectedSegment.overall_health === "concerning" ? "text-red-400"
                        : "text-yellow-400"
                      }>
                        {selectedSegment.overall_health} health
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Health Score</p>
                    <p className="text-3xl font-bold" style={{ color }}>
                      {healthScore}%
                    </p>
                  </div>
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Total Reviews", value: selectedSegment.total_reviews.toLocaleString(), color: "text-green-400" },
                  { label: "Dominant Sentiment", value: dominant.charAt(0).toUpperCase() + dominant.slice(1),
                    color: dominant === "positive" ? "text-green-400" : dominant === "negative" ? "text-red-400" : "text-yellow-400" },
                  { label: "Top Compliment Topic", value: compliment, color: "text-teal-400" },
                  { label: "Top Complaint Topic", value: complaint, color: "text-red-400" }
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-black/40 border border-white/10 p-4 rounded-xl">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className={`font-bold text-sm ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Sentiment pie + topic bar */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg text-green-400 mb-1">Sentiment Distribution</h3>
                  <p className="text-xs text-gray-500 mb-4">Breakdown for this segment</p>
                  {selectedSentimentPie && <Pie data={selectedSentimentPie} options={pieOptions} />}
                </div>

                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg text-green-400 mb-1">Topics in this Segment</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Review volume per BERTopic-extracted theme
                  </p>
                  {selectedTopicBar && <Bar data={selectedTopicBar} options={baseChartOptions} />}
                </div>
              </div>

              {/* Topic detail table */}
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <h3 className="text-lg text-green-400 mb-4">Topic Breakdown</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10 text-left">
                      <th className="p-2">Topic</th>
                      <th className="p-2">Reviews</th>
                      <th className="p-2">Positive</th>
                      <th className="p-2">Negative</th>
                      <th className="p-2">Neutral</th>
                      <th className="p-2">Health Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {[...(selectedSegment.topics || [])]
                      .sort((a, b) => b.review_count - a.review_count)
                      .map((topic, i) => {
                        const hs = getHealthScore(topic.sentiment_distribution);
                        return (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                            <td className="p-2 text-white font-medium">{topic.topic_name}</td>
                            <td className="p-2">{topic.review_count.toLocaleString()}</td>
                            <td className="p-2 text-green-400">{topic.sentiment_distribution?.positive || 0}</td>
                            <td className="p-2 text-red-400">{topic.sentiment_distribution?.negative || 0}</td>
                            <td className="p-2 text-yellow-400">{topic.sentiment_distribution?.neutral || 0}</td>
                            <td className="p-2">
                              <span className={`font-bold ${hs >= 70 ? "text-green-400" : hs >= 40 ? "text-yellow-400" : "text-red-400"}`}>
                                {hs}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default Segmentation;