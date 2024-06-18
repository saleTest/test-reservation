import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 3000,
  validateStatus: (status) => {
    return status.toString().startsWith("2");
  },
});
// client.interceptors.request.use(
//   async (config) => {
//     const token = AuthService.getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("Authorization Header:", config.headers.Authorization);
//     } else {
//       console.log("No token available");
//     }

//     // Ovde dodajemo payload u zahtev ako postoji
//     if (config.data) {
//       console.log("Request Payload:", config.data);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export async function useAxios(path: string, method = "get", payload = {}) {
  let rsp: AxiosResponse;

  try {
    const token = AuthService.getAccessToken();
    console.log("Access Token:", token);
    rsp = (await client.request({
      url: path,
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
      data: payload,
    })) as AxiosResponse;
  } catch (e) {
    console.error("Axios request error:", e);
    rsp = (e as AxiosError).response as AxiosResponse;
  }

  // if (rsp == undefined || rsp.status == 401) {
  //   window.location.href = "/login";
  // }

  if (rsp.status == 403) {
    try {
      console.log("Token expired, refreshing token...");
      const refreshToken = AuthService.getRefreshToken();
      console.log("Refresh Token:", refreshToken);
      const token = await client.request({
        url: "/user/refresh",
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${AuthService.getRefreshToken()}`,
        },
      });
      console.log("New access token received:", token.data);

      AuthService.saveAuth(token.data);

      return await client.request({
        url: path,
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
        data: payload,
      });
    } catch (e) {
      console.error("Token refresh failed:", e);

      AuthService.clearAuth();
      throw new Error("REFRESH_FAILED");
    }
  }

  if (rsp.status == 404) {
    console.error("Resource not found");

    throw new Error("NOT_FOUND");
  }

  return rsp;
}

export async function login(email: string, password: string) {
  return await client.request({
    url: "/user/login",
    method: "post",
    data: {
      email: email,
      password: password,
    },
  });
}
// export async function getAllRestaurant() {
//   return await client.request({
//     url: "/restaurant",
//     method: "get",
//   });
// }
