import { useState } from "react";

const SENTIMENT_STYLES = {
  positive: "bg-green-500/20 border-green-500 text-green-400",
  negative: "bg-red-500/20 border-red-500 text-red-400",
  neutral: "bg-yellow-500/20 border-yellow-500 text-yellow-400"
};

const PRIORITY_STYLES = {
  high: "text-red-400 bg-red-500/10 border border-red-500/30",
  medium: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/30",
  low: "text-green-400 bg-green-500/10 border border-green-500/30"
};

const HEALTH_STYLES = {
  positive: "text-green-400",
  negative: "text-red-400",
  neutral: "text-yellow-400"
};

const Card = ({ label, value, colorClass = "text-white", borderClass = "border-white/10 bg-white/5" }) => (
  <div className={`border p-4 rounded-lg ${borderClass}`}>
    <p className={`text-xs uppercase mb-1 opacity-60 ${colorClass}`}>{label}</p>
    <p className={`text-lg font-bold capitalize ${colorClass}`}>{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition space-y-4">
    <h2 className="text-lg text-green-400 font-semibold">{title}</h2>
    {children}
  </div>
);

const Row = ({ label, value, valueClass = "text-gray-200" }) => (
  <div className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
    <p className="text-xs text-gray-500 uppercase mb-1">{label}</p>
    <p className={`text-sm ${valueClass}`}>{value}</p>
  </div>
);

const LiveAnalyzer = () => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!title.trim() || !review.trim()) {
      setError("Please enter both a title and review text.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text: review })
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.detail || "Prediction failed. Please try again.");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const p = result?.predictions;
  const llm = result?.llm_interpretation;
  const seg = result?.segment_context;

  const sentimentStyle = SENTIMENT_STYLES[p?.sentiment] || "bg-white/5 border-white/10 text-white";
  const priorityStyle = PRIORITY_STYLES[llm?.priority] || "text-gray-300";
  const healthStyle = HEALTH_STYLES[seg?.segment_health] || "text-gray-300";

  return (
    <div className="bg-[#020617]">
      <div className="ml-16 p-10 text-white min-h-screen space-y-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400">Live Review Analyzer</h1>
        <p className="text-gray-400 max-w-xl">
          Enter a customer review and instantly get sentiment, customer segment,
          detected issues, LLM interpretation, and business insights.
        </p>

        {/* INPUT */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Review title e.g. 'Terrible product, stopped working after 2 days'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/60 border border-white/10 p-3 rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:border-green-400 transition text-sm"
          />
          <textarea
            className="w-full bg-black/60 border border-white/10 p-4 rounded-lg text-white
              placeholder-gray-500 focus:outline-none focus:border-green-400 transition resize-none"
            rows={4}
            placeholder="Enter customer review text..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            onClick={analyze}
            disabled={loading || !title || !review}
            className="bg-green-500 text-black px-6 py-2 rounded-lg font-semibold
              hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`border p-4 rounded-lg ${sentimentStyle}`}>
                <p className="text-xs uppercase opacity-60 mb-1">Sentiment</p>
                <p className="text-xl font-bold capitalize">{p.sentiment}</p>
              </div>
              <Card label="Category" value={p.category.replace(/_/g, " ")} colorClass="text-blue-400" borderClass="bg-blue-500/10 border-blue-500/30" />
              <Card label="Segment" value={p.super_cluster_name} colorClass="text-teal-400" borderClass="bg-teal-500/10 border-teal-500/30" />
              <Card label="Topic" value={p.topic_name} colorClass="text-purple-400" borderClass="bg-purple-500/10 border-purple-500/30" />
            </div>

            {/* Predictions Detail */}
            <Section title="Predictions">
              <div className="grid grid-cols-2 gap-4">
                <Row label="Category" value={p.category.replace(/_/g, " ")} />
                <Row label="Super Cluster" value={p.super_cluster_name} />
                <Row label="Topic" value={p.topic_name} />
                <Row label="Cluster ID" value={`Cluster ${p.cluster}`} />
              </div>
              {p.topic_summary && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 uppercase mb-1">Topic Summary</p>
                  <p className="text-sm text-gray-300">{p.topic_summary}</p>
                </div>
              )}
            </Section>

            {/* LLM Interpretation */}
            <Section title="LLM Interpretation">
              <Row label="Review Summary" value={llm.review_summary} />
              <Row label="Sentiment Explanation" value={llm.sentiment_explanation} />
              <Row label="Business Recommendation" value={llm.business_recommendation} valueClass="text-green-300" />
              <Row label="Customer Service Action" value={llm.cs_action} valueClass="text-blue-300" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Priority</p>
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${priorityStyle}`}>
                  {llm.priority}
                </span>
              </div>
            </Section>

            {/* Segment Context */}
            <Section title="Segment Context">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-gray-500 uppercase">Segment Health:</p>
                <span className={`text-sm font-bold capitalize ${healthStyle}`}>
                  {seg.segment_health}
                </span>
              </div>
              <Row label="Batch Recommendation" value={seg.batch_recommendation} valueClass="text-green-300" />
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Opportunities</p>
                <ul className="space-y-2">
                  {seg.segment_opportunities?.map((op, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-0.5">→</span>
                      {op}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          </>
        )}

      </div>
    </div>
  );
};

export default LiveAnalyzer;