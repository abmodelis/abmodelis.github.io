import axios, { AxiosResponse, AxiosRequestConfig, Method, AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL, `${API_URL}/api/v1/`);
axios.defaults.baseURL = `${API_URL}/api/v1/`;

export class ApiService {
  // private static refreshTokenPromise: Promise<AxiosResponse> | null = null;
  private static axiosConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token") && "Bearer " + localStorage.getItem("token"),
    },
  };

  // private static async refreshToken(): Promise<AxiosResponse> {
  //   if (this.refreshTokenPromise) {
  //     return this.refreshTokenPromise;
  //   }

  //   this.refreshTokenPromise = axios.post(`api/v1/auth/login`, {}, this.axiosConfig);
  //   try {
  //     return await this.refreshTokenPromise;
  //   } finally {
  //     this.refreshTokenPromise = null;
  //   }
  // }

  private static async request<T>(
    method: Method,
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const allConfig: AxiosRequestConfig = {
      ...this.axiosConfig,
      ...config,
      headers: {
        ...this.axiosConfig.headers,
        ...config?.headers,
      },
    };
    try {
      return await axios.request({
        ...allConfig,
        method,
        url: `${path}`,
        data,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.request.status === 401) {
        const username = process.env.REACT_APP_API_USERNAME;
        const password = process.env.REACT_APP_API_PASSWORD;
        if (username && password) {
          const loginResponse = await axios.post(
            `auth/login`,
            {
              username,
              password,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          localStorage.setItem("token", loginResponse.data.access_token);
          this.axiosConfig.headers!.Authorization = `Bearer ${loginResponse.data.access_token}`;
          return this.request<T>(method, path, data);
        }
      }
      throw error;
    }
  }

  static async post<T>(path: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>("POST", path, data);
  }

  static async get<T>(path: string): Promise<AxiosResponse<T>> {
    return this.request<T>("GET", path, undefined);
  }

  static async put<T>(path: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>("PUT", path, data);
  }

  static async delete<T>(path: string): Promise<AxiosResponse<T>> {
    return this.request<T>("DELETE", path, undefined);
  }

  static async multipart<T>(path: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.request<T>("POST", path, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
