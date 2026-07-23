import axios from "axios";

const api = axios.create({
  baseURL: "https://bank-fraud-detection-65cp.onrender.com",
});

export default api;