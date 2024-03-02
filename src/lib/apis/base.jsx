import axios from "axios";

// 공통된 로직 정의
const BASE_URL = "/api/"; // proxy 설정해둔 url로 이동
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  function (response) {
    // console.log(response.data);
    return response.data;
  },
  function (error) {
    if (error.response.status === 500) {
      console.error("500 에러 발생");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  function (config) {
    // request처리 로직 (header 등)
    return config;
  },
  function (error) {
    // 요청 오류시 처리 로직
    return Promise.reject(error);
  }
);

export default instance;
