import axios from "axios";

const apiKey = process.env.KAKAO_API_KEY;

// kakao api axios 기본 세팅
const KakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${apiKey}`,
  },
});

export default KakaoApi;
