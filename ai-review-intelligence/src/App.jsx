import { BrowserRouter,Routes,Route } from "react-router-dom"
import { predictReview } from "./api";
import Sidebar from "./components/layouts/Sidebar"
import { useState, useEffect } from "react";
import Home from "./pages/Home"
import EDADashboard from "./pages/EDADashboard"
import Segmentation from "./pages/Segmentation"
import SentimentModel from "./pages/SentimentModel"
import LiveAnalyzer from "./pages/LiveAnalyzer"
import BusinessInsights from "./pages/BusinessInsights"
import Methodology from "./pages/Methodology"

function App() {
const [title, setTitle] = useState("");
const [text, setText] = useState("");
const [result, setResult] = useState(null);

const handleSubmit = async () => {
  const data = await predictReview(title, text);
  setResult(data);
};
return (

<BrowserRouter>

<Sidebar/>

<Routes>

<Route path="/" element={<Home/>} />
<Route path="/eda" element={<EDADashboard/>} />
<Route path="/segmentation" element={<Segmentation/>} />
<Route path="/sentiment" element={<SentimentModel/>} />
<Route path="/analyzer" element={<LiveAnalyzer/>} />
<Route path="/insights" element={<BusinessInsights/>} />
<Route path="/methodology" element={<Methodology/>} />

</Routes>

</BrowserRouter>

)

}

export default App