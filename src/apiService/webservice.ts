import axios from "axios";
import { baseEndPoint } from "./endpoints";

const WebService = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set access token to header
export const manageAccessTokenToHeader = (token: string | null) => {
  console.log("token", token);

  if (token) {
    WebService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete WebService.defaults.headers.common["Authorization"];
  }
};

// Axios response interceptor
WebService.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      try {
        // token might be expired, so delete the token.
        manageAccessTokenToHeader("");
        // TODO: need to direct to singin page
      } catch (error) {
        console.error("Failed to acquire access token:", error);
        throw error;
      }
    }
    return Promise.reject(err);
  }
);

export default WebService;
