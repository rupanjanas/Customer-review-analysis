import { useState, useEffect } from "react";
import KpiCard from "../components/cards/KpiCard";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import umapImage from "../assets/Umap_projection.jpeg";
import silhouetteImage from "../assets/Silhoutte_score.jpeg";
import hdbscanImage from "../assets/Hdbscan_tree.jpeg";

const EDADashboard = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [segmentsData, setSegmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, segRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/categories"),
          fetch("http://127.0.0.1:8000/segments")
        ]);
        if (!catRes.ok || !segRes.ok) throw new Error("Failed to fetch");
        const catData = await catRes.json();
        const segData = await segRes.json();
        setCategoriesData(catData.categories || []);
        setSegmentsData(segData.segments || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // --- /categories derived ---

  const totalReviews = categoriesData.reduce(
    (sum, cat) => sum + (cat.total_reviews || 0), 0
  );

  const topCategory = categoriesData.reduce(
    (top, cat) => (!top || cat.total_reviews > top.total_reviews ? cat : top),
    null
  );

  const allClusters = categoriesData.flatMap((cat) =>
    (cat.super_clusters || []).map((sc) => ({
      name: sc.super_cluster_name,
      reviews: sc.total_reviews,
      health: sc.overall_health,
      sentiment: sc.sentiment_dist || {}
    }))
  );

  // Global sentiment from /categories
  const globalSentiment = categoriesData.reduce((acc, cat) => {
    cat.super_clusters?.forEach((sc) => {
      Object.entries(sc.sentiment_dist || {}).forEach(([key, val]) => {
        acc[key] = (acc[key] || 0) + val;
      });
    });
    return acc;
  }, {});

  const totalSentimentCount = Object.values(globalSentiment).reduce((a, b) => a + b, 0);
  const positivePct = totalSentimentCount > 0
    ? (((globalSentiment["positive"] || 0) / totalSentimentCount) * 100).toFixed(1)
    : "—";
  const negativePct = totalSentimentCount > 0
    ? (((globalSentiment["negative"] || 0) / totalSentimentCount) * 100).toFixed(1)
    : "—";

  // Segment health
  const healthEntries = Object.entries(
    allClusters.reduce((acc, sc) => {
      const h = sc.health || "unknown";
      acc[h] = (acc[h] || 0) + 1;
      return acc;
    }, {})
  );

  // --- /segments derived ---

  // All topics across all segments, aggregated by name
  const topicMap = segmentsData.reduce((acc, seg) => {
    seg.topics?.forEach((t) => {
      if (!acc[t.topic_name]) {
        acc[t.topic_name] = {
          count: 0,
          positive: 0,
          negative: 0,
          neutral: 0
        };
      }
      acc[t.topic_name].count += t.review_count || 0;
      acc[t.topic_name].positive += t.sentiment_distribution?.positive || 0;
      acc[t.topic_name].negative += t.sentiment_distribution?.negative || 0;
      acc[t.topic_name].neutral += t.sentiment_distribution?.neutral || 0;
    });
    return acc;
  }, {});

  // Top 8 topics by review count — replaces "word frequency"
  const top8Topics = Object.entries(topicMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);

  const topicFreqData = {
    labels: top8Topics.map(([name]) => name),
    values: top8Topics.map(([, v]) => v.count)
  };

  // Topic sentiment — positive vs negative for top 6 topics
  const top6Topics = top8Topics.slice(0, 6);
  const topicSentimentPositive = {
    labels: top6Topics.map(([name]) => name),
    values: top6Topics.map(([, v]) => v.positive)
  };
  const topicSentimentNegative = {
    labels: top6Topics.map(([name]) => name),
    values: top6Topics.map(([, v]) => v.negative)
  };

  // Top 6 segments by reviews
  const top6Clusters = [...allClusters]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 6);

  // --- Chart data ---

  const categoryData = {
    labels: categoriesData.map((c) => c.display_name),
    values: categoriesData.map((c) => c.total_reviews)
  };

  const sentimentBarData = {
    labels: Object.keys(globalSentiment).map(
      (k) => k.charAt(0).toUpperCase() + k.slice(1)
    ),
    values: Object.values(globalSentiment)
  };

  const sentimentColors = Object.keys(globalSentiment).map((k) =>
    k === "positive" ? "#22c55e"
    : k === "negative" ? "#ef4444"
    : "#facc15"
  );

  const clusterBarData = {
    labels: top6Clusters.map((c) => c.name),
    values: top6Clusters.map((c) => c.reviews)
  };

  const segmentHealthData = {
    labels: healthEntries.map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)),
    values: healthEntries.map(([, v]) => v)
  };

  const segmentHealthColors = healthEntries.map(([health]) =>
    health === "positive" ? "#22c55e"
    : health === "concerning" ? "#ef4444"
    : "#facc15"
  );

  const insights = [
    topCategory
      ? `${topCategory.display_name} leads with ${topCategory.total_reviews.toLocaleString()} reviews.`
      : null,
    `${positivePct}% positive and ${negativePct}% negative sentiment across all segments.`,
    `${allClusters.length} customer segments across ${categoriesData.length} categories.`,
    top6Clusters[0]
      ? `"${top6Clusters[0].name}" is the most reviewed segment (${top6Clusters[0].reviews.toLocaleString()} reviews).`
      : null,
    top8Topics[0]
      ? `"${top8Topics[0][0]}" is the most discussed topic with ${top8Topics[0][1].count.toLocaleString()} reviews.`
      : null,
  ].filter(Boolean);

  if (loading) {
    return (
      <div className="p-10 text-white bg-[#020617] min-h-screen flex items-center justify-center">
        <p className="text-green-400 text-xl animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-white bg-[#020617] min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-10 text-white bg-[#020617] min-h-screen">

      <h1 className="ml-16 text-3xl font-bold mb-2 text-green-400">
        Exploratory Data Analysis
      </h1>

      {/* KPI CARDS */}
      <div className="ml-16 grid grid-cols-4 gap-6 mb-10">
        <KpiCard title="Total Reviews" value={totalReviews.toLocaleString()} />
        <KpiCard title="Positive Sentiment" value={`${positivePct}%`} />
        <KpiCard title="Negative Sentiment" value={`${negativePct}%`} />
        <KpiCard title="Top Category" value={topCategory?.display_name || "—"} />
      </div>

      {/* CHART GRID */}
      <div className="ml-16 grid grid-cols-2 gap-8">

        {/* CATEGORY SHARE — Pie */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Category Share</h3>
          <p className="text-xs text-gray-500 mb-4">Review volume per product category</p>
          <PieChart data={categoryData} />
        </div>

        {/* SENTIMENT DISTRIBUTION — Bar */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Sentiment Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Aggregated sentiment counts across all segments</p>
          <BarChart data={sentimentBarData} backgroundColors={sentimentColors} />
        </div>

        {/* TOPIC FREQUENCY — replaces Word Frequency */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Top Topics by Review Volume</h3>
          <p className="text-xs text-gray-500 mb-4">
            Most discussed topics across all segments — sourced from <span className="text-green-500/60">/segments</span>
          </p>
          <BarChart data={topicFreqData} />
        </div>

        {/* TOPIC POSITIVE SENTIMENT */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Positive Reviews per Topic</h3>
          <p className="text-xs text-gray-500 mb-4">
            Count of positive-sentiment reviews for top 6 topics
          </p>
          <BarChart data={topicSentimentPositive} />
        </div>

        {/* TOPIC NEGATIVE SENTIMENT */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-red-400 transition">
          <h3 className="mb-1 text-lg text-red-400">Negative Reviews per Topic</h3>
          <p className="text-xs text-gray-500 mb-4">
            Count of negative-sentiment reviews for top 6 topics
          </p>
          <BarChart
            data={topicSentimentNegative}
            backgroundColors={top6Topics.map(() => "#ef4444")}
          />
        </div>

        {/* TOP 6 SEGMENTS */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Top 6 Segments by Reviews</h3>
          <p className="text-xs text-gray-500 mb-4">Highest volume customer segments</p>
          <BarChart data={clusterBarData} />
        </div>

        {/* SEGMENT HEALTH */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-1 text-lg text-green-400">Segment Health Breakdown</h3>
          <p className="text-xs text-gray-500 mb-4">Number of segments by health status</p>
          <BarChart data={segmentHealthData} backgroundColors={segmentHealthColors} />
        </div>

        {/* ── UMAP 2D PROJECTION ───────────────────────── */}
<div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
  <h2 className="text-xl mb-1 text-green-400">UMAP 2D Projection of Product Reviews</h2>
  <p className="text-xs text-gray-500 mb-4">
    Each point is a customer review embedded via SentenceTransformer (768-dim) 
    and reduced to 2D using UMAP. Colors represent product categories. 
    Spatial clusters reflect semantic similarity in review language.
  </p>
  <div className="w-full rounded-xl overflow-hidden border border-white/5">
    <img
      src={umapImage}
      alt="UMAP 2D Projection"
      className="w-full object-contain"
    />
  </div>
</div>

{/* ── SILHOUETTE SCORES ────────────────────────── */}
<div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
  <h2 className="text-xl mb-1 text-green-400">Silhouette Score vs k — KMeans Super-Cluster Selection</h2>
  <p className="text-xs text-gray-500 mb-4">
    Silhouette scores evaluated across different values of k (number of super-clusters) 
    per category. The selected k (★) maximises cluster separation and cohesion. 
    Higher score = better defined clusters.
  </p>
  <div className="w-full rounded-xl overflow-hidden border border-white/5">
    <img
      src={silhouetteImage}
      alt="Silhouette Score vs K"
      className="w-full object-contain"
    />
  </div>
</div>

{/* ── HDBSCAN CONDENSED TREE ───────────────────── */}
<div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
  <h2 className="text-xl mb-1 text-green-400">HDBSCAN Condensed Tree — Cluster Formation Hierarchy</h2>
  <p className="text-xs text-gray-500 mb-4">
    The condensed tree shows how clusters form and persist across density levels (Lambda = 1/distance). 
    Red highlighted branches are the selected final clusters. 
    Colour intensity represents the number of data points in each branch.
  </p>
  <div className="w-full rounded-xl overflow-hidden border border-white/5">
    <img
      src={hdbscanImage}
      alt="HDBSCAN Condensed Tree"
      className="w-full object-contain"
    />
  </div>
</div>

        {/* KEY INSIGHTS — full width */}
        <div className="col-span-2 bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-green-400 transition">
          <h3 className="mb-4 text-lg text-green-400">Key Insights</h3>
          <ul className="text-gray-300 space-y-2 text-sm list-disc list-inside">
            {insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default EDADashboard;