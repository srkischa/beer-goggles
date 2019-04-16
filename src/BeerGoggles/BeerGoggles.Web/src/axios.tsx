import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL;

const instance = axios.create({
  baseURL: apiBaseUrl || "http://localhost:5000/api"
});

export default instance;
