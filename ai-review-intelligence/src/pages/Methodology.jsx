const Methodology = () => {
  return (
    <div className="ml-64 p-10 space-y-10">

      <h1 className="text-3xl font-bold">
        System Methodology
      </h1>

      <p className="text-gray-300 max-w-3xl">
        Our AI-powered system processes customer reviews through multiple
        stages including text preprocessing, feature extraction, clustering,
        sentiment analysis, and business intelligence generation.
      </p>

      {/* Pipeline Flow */}

      <div className="grid grid-cols-7 gap-4 items-center text-center">

        <div className="bg-card p-4 rounded-lg">
          Raw Reviews
        </div>

        <div>➡</div>

        <div className="bg-card p-4 rounded-lg">
          Text Cleaning
        </div>

        <div>➡</div>

        <div className="bg-card p-4 rounded-lg">
          Embeddings
        </div>

        <div>➡</div>

        <div className="bg-card p-4 rounded-lg">
          Clustering
        </div>

      </div>

      <div className="grid grid-cols-7 gap-4 items-center text-center">

        <div className="bg-card p-4 rounded-lg">
          Cluster Profiling
        </div>

        <div>➡</div>

        <div className="bg-card p-4 rounded-lg">
          Sentiment Model
        </div>

        <div>➡</div>

        <div className="bg-card p-4 rounded-lg">
          Business Insights
        </div>

      </div>

      {/* Method Steps */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            1. Text Preprocessing
          </h2>

          <p className="text-gray-400">
            Reviews are cleaned by removing punctuation, stopwords,
            and unnecessary symbols. Text normalization improves
            model performance.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            2. Sentence Embeddings
          </h2>

          <p className="text-gray-400">
            Reviews are converted into vector representations
            using sentence transformers so semantic similarity
            can be captured.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            3. Dimensionality Reduction
          </h2>

          <p className="text-gray-400">
            UMAP reduces high-dimensional embeddings into
            lower dimensions for clustering and visualization.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            4. Customer Segmentation
          </h2>

          <p className="text-gray-400">
            Clustering algorithms like KMeans, DBSCAN and
            Gaussian Mixture identify different customer
            segments based on review patterns.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            5. Sentiment Classification
          </h2>

          <p className="text-gray-400">
            Machine learning models classify each review
            into positive, negative, or neutral sentiment.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-3">
            6. Business Intelligence
          </h2>

          <p className="text-gray-400">
            The system converts insights into actionable
            recommendations for product improvement,
            marketing strategy, and customer retention.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Methodology;