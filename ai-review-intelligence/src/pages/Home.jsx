import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import heroImage from "../assets/undraw_financial-data_lbci.png";
import customer from "../assets/undraw_customer-survey_ek29.png";
import sentiment from "../assets/undraw_sentiment-analysis_rke9.png";
import review from "../assets/undraw_leave-a-review_uj9v.png";

const Home = () => {
  const canvasRef = useRef(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* PARTICLE CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* All content above canvas */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* HERO */}
        <section className="ml-10 grid grid-cols-2 items-center px-16 py-24 border-b border-gray-800 relative overflow-hidden">

          {/* Glow blob */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold text-green-400 border border-green-500/30 rounded-full bg-green-500/10 tracking-widest uppercase">
              ML + LLM Powered
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              <span className="text-green-500">AI-Powered</span>{" "}
              Customer Review
              <br />
              Intelligence System
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
              Turn thousands of customer reviews into actionable insights using
              machine learning, sentiment analysis and intelligent dashboards.
            </p>

            <div className="flex gap-4">
              <Link
                to="/eda"
                className="relative overflow-hidden border border-green-500 px-6 py-3 rounded font-semibold
                  hover:bg-green-500 hover:text-black transition-all duration-300 group"
              >
                <span className="relative z-10">Explore Dashboard</span>
                <span className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
              <Link
                to="/analyzer"
                className="relative overflow-hidden border border-green-500 px-6 py-3 rounded
                  hover:bg-green-500 hover:text-black transition-all duration-300 group"
              >
                <span className="relative z-10">Live Analyzer</span>
                <span className="absolute inset-0 bg-green-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center ml-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-teal-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                className="relative rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="px-16 py-20 border-b border-gray-800 ml-10 relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-green-500/40 to-transparent" />
          <p className="text-gray-400 max-w-3xl leading-relaxed text-lg">
            Businesses receive thousands of customer reviews across e-commerce
            platforms and digital products. Extracting meaningful insights from
            this unstructured text data is extremely challenging without
            intelligent systems.{" "}
            <span className="text-gray-200">
              Our AI platform automatically analyzes reviews, detects sentiment
              trends, identifies customer segments and converts feedback into
              strategic business insights.
            </span>
          </p>
        </section>

        {/* OBJECTIVES */}
        <section className="ml-10 px-16 py-20 border-b border-gray-800">
          <h2 className="text-green-500 text-2xl mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500 inline-block" />
            Project Objectives
          </h2>

          <div className="grid grid-cols-4 gap-8">
            {[
              { img: heroImage, title: "EDA for business insights", desc: "Discover trends in customer feedback." },
              { img: customer, title: "Customer Segmentation", desc: "Identify customer groups using clustering." },
              { img: sentiment, title: "Sentiment Prediction", desc: "Automatically classify review sentiment." },
              { img: review, title: "Intelligent recommendations", desc: "Convert feedback into business strategy." }
            ].map(({ img, title, desc }, i) => (
              <div
                key={i}
                className="p-6 border border-gray-800 hover:border-green-500 transition-all duration-300
                  rounded group hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10
                  bg-black/40 backdrop-blur-sm"
              >
                <div className="overflow-hidden rounded mb-4">
                  <img
                    src={img}
                    className="w-full rounded transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DATASET */}
        <section className="ml-10 px-16 py-20 border-b border-gray-800">
          <h2 className="text-green-500 text-2xl mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500 inline-block" />
            Dataset Overview
          </h2>

          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { label: "Total Reviews", value: "12,580" },
              { label: "Fields Used", value: "" },
              { label: "Data Source", value: "" }
            ].map(({ label, value }, i) => (
              <div
                key={i}
                className="border border-gray-800 p-8 rounded hover:border-green-500/50
                  transition-all duration-300 bg-black/30 hover:bg-green-500/5
                  hover:shadow-lg hover:shadow-green-500/10 group"
              >
                <p className="text-gray-400 text-sm mb-2">{label}</p>
                {value && (
                  <h3 className="text-3xl font-bold text-green-500 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {value}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section className="px-16 py-20 ml-10">
          <h2 className="text-green-500 text-2xl mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500 inline-block" />
            Technology Stack
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {[
              { title: "Frontend", tech: "React • TailwindCSS • Chart.js" },
              { title: "Backend", tech: "Python • FastAPI • Flask" },
              { title: "AI / ML", tech: "NLP • Transformers • Clustering" }
            ].map(({ title, tech }, i) => (
              <div
                key={i}
                className="border border-gray-800 p-6 rounded hover:border-green-500
                  transition-all duration-300 group relative overflow-hidden
                  hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="font-semibold mb-2 text-white group-hover:text-green-400 transition-colors duration-300 relative z-10">
                  {title}
                </h3>
                <p className="text-gray-400 relative z-10">{tech}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;