import axios from "axios";

const apiKey = import.meta.env.VITE_APP_KAKAO_API_KEY;

// kakao api axios 기본 세팅
const KakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search",
  headers: {
    Authorization: `KakaoAK ${apiKey}`,
  },
});

export default KakaoApi;
