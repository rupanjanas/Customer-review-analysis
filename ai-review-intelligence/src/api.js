import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const predictReview = async (title, text) => {
  const res = await axios.post(`${API_BASE}/predict`, {
    title,
    text,
  });
  return res.data;
};
export const getRecommendations = async (category, segment) => {
  const res = await fetch(
    `http://127.0.0.1:8000/recommendations/${category}/${segment}`
  );
  return res.json();
};