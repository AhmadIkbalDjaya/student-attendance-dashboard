import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${localStorage.getItem("token")}`
    Authorization: `Bearer 3|daNzAFEI1Slvdnue4d5j8IYdRFMc1FT4CMnDR3ZA1bbee4d1`,
  },
});

export default apiClient;
