import axios from "axios";

// axios 기본 세팅
const Api = axios.create({
  baseURL:
    "http://ec2-43-200-219-213.ap-northeast-2.compute.amazonaws.com:8080/api",
  // "test",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default Api;
