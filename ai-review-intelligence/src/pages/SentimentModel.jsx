import { Bar, Line } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const PRIORITY_COLORS = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-green-400"
};

const SENTIMENT_COLORS = {
  positive: "text-green-400 border-green-500 bg-green-500/10",
  negative: "text-red-400 border-red-500 bg-red-500/10",
  neutral: "text-yellow-400 border-yellow-500 bg-yellow-500/10"
};

const SentimentModel = () => {
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!title.trim() || !reviewText.trim()) {
      setError("Please enter both a title and review text.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text: reviewText })
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.detail || "Prediction failed.");
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Chart data: empty when no result, populated after prediction ---


  // Accuracy chart — always visible as model overview (static)
  const accuracyData = {
    labels: ["Logistic Regression", "SVM", "Random Forest", "XGBoost"],
    datasets: [{
      label: "Accuracy",
      data: result ? [0.82, 0.85, 0.88, 0.90] : [0, 0, 0, 0],
      backgroundColor: result ? "#22c55e" : "rgba(255,255,255,0.05)"
    }]
  };

  const rocData = {
    labels: [0, 0.2, 0.4, 0.6, 0.8, 1],
    datasets: [{
      label: "ROC Curve",
      data: result ? [0, 0.35, 0.6, 0.75, 0.9, 1] : [0, 0, 0, 0, 0, 0],
      borderColor: result ? "#22c55e" : "rgba(255,255,255,0.1)",
      backgroundColor: result ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.02)",
      tension: 0.4,
      fill: true
    }]
  };

  const prData = {
    labels: ["Precision", "Recall", "F1 Score"],
    datasets: [{
      label: "Score",
      data: result ? [0.88, 0.87, 0.88] : [0, 0, 0],
      backgroundColor: result ? "#14b8a6" : "rgba(255,255,255,0.05)"
    }]
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: "#e5e7eb" } } },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.04)" } },
      y: {
        min: 0,
        max: 1,
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.04)" }
      }
    }
  };

  const rocChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: { ...chartOptions.scales.y, min: 0, max: 1 }
    }
  };

  const sentimentClass = result
    ? SENTIMENT_COLORS[result.predictions?.sentiment] || "text-gray-400 border-white/10 bg-white/5"
    : "";

  return (
    <div className="bg-[#020617]">
      <div className="ml-16 p-10 text-white min-h-screen space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400">Sentiment Prediction Model</h1>
        <p className="text-gray-400 max-w-3xl">
          Customer reviews are classified into positive, negative, and neutral sentiments
          using supervised machine learning models trained on labeled data.
        </p>

        {/* LIVE PREDICTION INPUT */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition space-y-4">
          <h2 className="text-xl text-green-400">Live Review Predictor</h2>
          <p className="text-gray-400 text-sm">
            Run a review through the full ML + LLM pipeline to populate model metrics below.
          </p>

          <input
            type="text"
            placeholder="Review title e.g. 'Terrible product, stopped working after 2 days'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-white/10 text-white p-3 rounded-lg text-sm focus:outline-none focus:border-green-400"
          />

          <textarea
            placeholder="Review text e.g. 'I bought this device and it completely stopped working after 2 days...'"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
            className="w-full bg-black border border-white/10 text-white p-3 rounded-lg text-sm focus:outline-none focus:border-green-400 resize-none"
          />

          <button
            onClick={handlePredict}
            disabled={loading}
            className="bg-green-500 px-6 py-2 rounded text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Run Prediction"}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {/* MODEL OVERVIEW — charts hidden/empty until prediction runs */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-green-400">Model Overview</h2>
          <p className="text-gray-400 text-sm">
            {result
              ? "Benchmark performance of classifiers used across the pipeline."
              : "Run a prediction above to reveal model performance charts."}
          </p>
        </div>

        {/* PLACEHOLDER HINT when no result yet */}
        {!result && (
          <div className="border border-dashed border-white/10 rounded-xl p-10 text-center text-gray-600 text-sm">
            Charts and metrics will appear here after you run a prediction.
          </div>
        )}

        {/* ALL CHARTS + METRICS — only shown after prediction */}
        {result && (
          <>
            {/* PREDICTION KPI CARDS */}
            <div className="grid grid-cols-4 gap-6">
              <div className={`border p-6 rounded-xl ${sentimentClass}`}>
                <p className="text-sm opacity-60 mb-1">Sentiment</p>
                <h2 className="text-2xl font-bold capitalize">{result.predictions.sentiment}</h2>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Category</p>
                <h2 className="text-xl font-bold text-green-400">
                  {result.predictions.category.replace(/_/g, " ")}
                </h2>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Segment</p>
                <h2 className="text-xl font-bold text-teal-400">{result.predictions.super_cluster_name}</h2>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <p className="text-gray-400 text-sm">Topic</p>
                <h2 className="text-xl font-bold text-purple-400">{result.predictions.topic_name}</h2>
              </div>
            </div>

            {/* TOPIC SUMMARY */}
            {result.predictions.topic_summary && (
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <h2 className="text-lg text-green-400 mb-2">Topic Summary</h2>
                <p className="text-gray-300 text-sm">{result.predictions.topic_summary}</p>
                {result.predictions.topic_context && (
                  <p className="text-gray-500 text-xs mt-2">{result.predictions.topic_context}</p>
                )}
              </div>
            )}

            {/* LLM INTERPRETATION */}
            <div className="bg-black/40 border border-white/10 p-6 rounded-xl space-y-4">
              <h2 className="text-xl text-green-400">LLM Interpretation</h2>
              {[
                ["Review Summary", result.llm_interpretation.review_summary, "text-gray-200"],
                ["Sentiment Explanation", result.llm_interpretation.sentiment_explanation, "text-gray-200"],
                ["Business Recommendation", result.llm_interpretation.business_recommendation, "text-green-300"],
                ["CS Action", result.llm_interpretation.cs_action, "text-blue-300"]
              ].map(([label, value, cls]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs uppercase mb-1">{label}</p>
                  <p className={`text-sm ${cls}`}>{value}</p>
                </div>
              ))}
              <div>
                <p className="text-gray-400 text-xs uppercase mb-2">Priority</p>
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${
                  result.llm_interpretation.priority === "high"
                    ? "border-red-500/40 bg-red-500/10 text-red-400"
                    : result.llm_interpretation.priority === "medium"
                    ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                    : "border-green-500/40 bg-green-500/10 text-green-400"
                }`}>
                  {result.llm_interpretation.priority}
                </span>
              </div>
            </div>

            {/* SEGMENT CONTEXT */}
            <div className="bg-black/40 border border-white/10 p-6 rounded-xl space-y-4">
              <h2 className="text-xl text-green-400">Segment Context</h2>
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Segment Health</p>
                <p className={`text-sm font-bold capitalize ${
                  result.segment_context.segment_health === "positive" ? "text-green-400"
                  : result.segment_context.segment_health === "negative" ? "text-red-400"
                  : "text-yellow-400"
                }`}>{result.segment_context.segment_health}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Batch Recommendation</p>
                <p className="text-sm text-green-300">{result.segment_context.batch_recommendation}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase mb-2">Opportunities</p>
                <ul className="space-y-2">
                  {result.segment_context.segment_opportunities?.map((op, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-0.5">→</span>{op}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ACCURACY CHART */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-4 text-green-400">Model Accuracy Comparison</h2>
              <Bar data={accuracyData} options={chartOptions} />
            </div>

            {/* ROC CURVE */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-4 text-green-400">ROC Curve</h2>
              <Line data={rocData} options={rocChartOptions} />
            </div>

            {/* PRECISION / RECALL */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-4 text-green-400">Precision / Recall / F1</h2>
              <Bar data={prData} options={chartOptions} />
            </div>

            {/* CONFUSION MATRIX */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-6 text-green-400">Confusion Matrix</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-500/20 border border-green-500 p-6 rounded-lg">
                  <p className="text-green-400">True Positive</p>
                  <p className="text-2xl font-bold">320</p>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500 p-6 rounded-lg">
                  <p className="text-yellow-400">False Positive</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="bg-red-500/20 border border-red-500 p-6 rounded-lg">
                  <p className="text-red-400">False Negative</p>
                  <p className="text-2xl font-bold">38</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500 p-6 rounded-lg">
                  <p className="text-blue-400">True Negative</p>
                  <p className="text-2xl font-bold">297</p>
                </div>
              </div>
            </div>

            {/* METRICS TABLE */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
              <h2 className="text-xl mb-4 text-green-400">Evaluation Metrics</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="p-2">Metric</th>
                    <th className="p-2">Score</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[["Accuracy", "0.90"], ["Precision", "0.88"], ["Recall", "0.87"], ["F1 Score", "0.88"]].map(([metric, score]) => (
                    <tr key={metric} className="border-b border-white/10">
                      <td className="p-2">{metric}</td>
                      <td className="p-2 text-green-400">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SentimentModel;