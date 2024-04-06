import axios from "axios";

const instance = axios.create();

const RemoveLoginStatusInSession = () => {
  if (sessionStorage.getItem("login_user")?.length !== 0) {
    sessionStorage.clear();
    return true;
  }
};

instance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      newConfig.headers.Authorization = token;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const input = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        const url = process.env.NEXT_PUBLIC_API_URL + "/users/refresh";
        // console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        if (response.status === 200) {
          const result = await response.json();
          const accessToken = result.results.accessToken;
          error.config.headers.Authorization = `${accessToken}`;
          sessionStorage.setItem("accessToken", accessToken);
          return axios.request(error.config);
        } else {
          // console.log(response);
        }
      } catch (refreshError) {
        alert("로그인 시간이 만료됐습니다. 재로그인해주세요. ");
        RemoveLoginStatusInSession();
        window.location.href = "/";
      }
    } else if (error.response && error.response.data.code === 3006) {
      alert("만료된 리프레쉬 토큰입니다. 다시 로그인해주세요. ");
      RemoveLoginStatusInSession();
      window.location.href = "/";
      return;
    } 
    return Promise.reject(error);
  }
);

export default instance;
