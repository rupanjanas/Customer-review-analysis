import { Link } from "react-router-dom";
import heroImage from "../assets/undraw_financial-data_lbci.png";
import customer from "../assets/undraw_customer-survey_ek29.png";
import sentiment from "../assets/undraw_sentiment-analysis_rke9.png";
import review from "../assets/undraw_leave-a-review_uj9v.png";
const Home = () => {
  return (
    <div className=" bg-black text-white min-h-screen">

      {/* HERO */}

      <section className=" ml-10 grid grid-cols-2 items-center px-16 py-24 border-b border-gray-800">

        <div>

          <h1 className="text-5xl font-bold leading-tight mb-6">

            <span className="text-green-500">
              AI-Powered
            </span>{" "}
            Customer Review
            <br/>
            Intelligence System

          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">

            Turn thousands of customer reviews into actionable
            insights using machine learning, sentiment analysis
            and intelligent dashboards.

          </p>

          <div className="flex gap-4">

            <Link
              to="/eda"
              className="border border-green-500 px-6 py-3 rounded font-semibold hover:bg-green-500 hover:text-black transition"
            >
              Explore Dashboard
            </Link>

            <Link
              to="/analyzer"
              className="border border-green-500 px-6 py-3 rounded hover:bg-green-500 hover:text-black transition"
            >
              Live Analyzer
            </Link>

          </div>

        </div>

        <div className="flex justify-center ml-10">

          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            className="rounded-xl shadow-xl"
          />

        </div>

      </section>

      {/* PROBLEM */}

      <section className="px-16 py-20 border-b border-gray-800 ml-10">

        <p className="text-gray-400 max-w-3xl leading-relaxed text-lg">

          Businesses receive thousands of customer reviews across
          e-commerce platforms and digital products. Extracting
          meaningful insights from this unstructured text data is
          extremely challenging without intelligent systems.

          Our AI platform automatically analyzes reviews,
          detects sentiment trends, identifies customer
          segments and converts feedback into strategic
          business insights.

        </p>

      </section>

      {/* OBJECTIVES */}

      <section className="ml-10 px-16 py-20 border-b border-gray-800">

        <h2 className="text-green-500 text-2xl mb-10">
          Project Objectives
        </h2>

        <div className="grid grid-cols-4 gap-8">

          <div className="p-6 border border-gray-800 hover:border-green-500 transition rounded">
            <img
            src={heroImage}
            className="w-full mb-4 rounded"
          />
            <h3 className="font-semibold mb-2">
              EDA for business insights
            </h3>
            <p className="text-gray-400 text-sm">
              Discover trends in customer feedback.
            </p>
          </div>

          <div className="p-6 border border-gray-800 hover:border-green-500 transition rounded">
             <img
            src={customer}
            className="w-2xl mb-16 rounded"
          />
            <h3 className="font-semibold mb-2">
              Customer Segmentation
            </h3>
            <p className="text-gray-400 text-sm">
              Identify customer groups using clustering.
            </p>
          </div>

          <div className="p-6 border border-gray-800 hover:border-green-500 transition rounded">
            <img
            src={sentiment}
            className="w-auto rounded"
          />
            <h3 className="font-semibold mb-2">
              Sentiment Prediction
            </h3>
            <p className="text-gray-400 text-sm">
              Automatically classify review sentiment.
            </p>
          </div>

          <div className="p-6 border border-gray-800 hover:border-green-500 transition rounded">
             <img
            src={review}
            className="w-full mb-4 rounded"
          />
            <h3 className="font-semibold mb-2">
              Intelligent recommendations
            </h3>
            <p className="text-gray-400 text-sm">
              Convert feedback into business strategy.
            </p>
          </div>

        </div>

      </section>

      {/* DATASET */}

      <section className="ml-10 px-16 py-20 border-b border-gray-800">

        <h2 className="text-green-500 text-2xl mb-10">
          Dataset Overview
        </h2>

        <div className="grid grid-cols-4 gap-8 text-center">

          <div className="border border-gray-800 p-8 rounded">
            <p className="text-gray-400 text-sm">
              Total Reviews
            </p>
            <h3 className="text-3xl font-bold text-green-500">
              12,580
            </h3>
          </div>

          <div className="border border-gray-800 p-8 rounded">
            <p className="text-gray-400 text-sm">
              Fields used
            </p>
           
          </div>

          <div className="border border-gray-800 p-8 rounded">
            <p className="text-gray-400 text-sm">
              Data source
            </p>
            
          </div>

         

        </div>

      </section>

      {/* TECH STACK */}

      <section className="px-16 py-20 ml-10">

        <h2 className="text-green-500 text-2xl mb-10">
          Technology Stack
        </h2>

        <div className="grid grid-cols-3 gap-8">

          <div className="border border-gray-800 p-6 rounded hover:border-green-500 transition">

            <h3 className="font-semibold mb-2">
              Frontend
            </h3>

            <p className="text-gray-400">
              React • TailwindCSS • Chart.js
            </p>

          </div>

          <div className="border border-gray-800 p-6 rounded hover:border-green-500 transition">

            <h3 className="font-semibold mb-2">
              Backend
            </h3>

            <p className="text-gray-400">
              Python • FastAPI • Flask
            </p>

          </div>

          <div className="border border-gray-800 p-6 rounded hover:border-green-500 transition">

            <h3 className="font-semibold mb-2">
              AI / ML
            </h3>

            <p className="text-gray-400">
              NLP • Transformers • Clustering
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;