import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

console.log(apiBaseUrl);

const instance = axios.create({
  baseURL: apiBaseUrl
});

export default instance;
