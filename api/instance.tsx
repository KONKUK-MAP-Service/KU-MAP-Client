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
        const response = await axios.post(
          process.env.REACT_APP_SERVER_API + "/users/refresh",
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            body: JSON.stringify({ refreshToken: sessionStorage.getItem("refreshToken") }),
          }
        );
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios.request(error.config);
        } else {
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
