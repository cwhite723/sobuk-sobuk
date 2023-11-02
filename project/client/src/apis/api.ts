import axios from "axios";

// axios 기본 세팅
const Api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default Api;
