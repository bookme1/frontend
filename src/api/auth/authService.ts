import axios, { AxiosResponse } from "axios";
import { IUser } from "./authService.types";
import Notiflix from "notiflix";

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  }

  public async signIn(email: string, password: string): Promise<AxiosResponse> {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/email/login`, {
        email,
        password,
      });
      // if (!response.data.user.verified) {
      //   Notiflix.Notify.success(
      //     "Активуйте акаунт по посиланню на вашій пошті. Лист може знаходитись у спамі"
      //   );
      // } else {
      Notiflix.Notify.success("Ласкаво просимо");
      // window.location.replace("/account");
      const { tokens } = response.data;
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      return response.data.tokens;
      // }
      return response;
    } catch (error) {
      Notiflix.Notify.failure("Неправильний імейл або пароль");
      throw error;
    }
  }

  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/email/signup`, {
        username: name,
        email,
        password,
      });
      Notiflix.Notify.success("Перегляньте свою пошту");
      return response;
    } catch (error) {
      Notiflix.Notify.failure("Імейл вже зайнятий");
      throw error;
    }
  }

  public async userRefreshToken(
    refreshToken: string | null
  ): Promise<AxiosResponse> {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const instance = axios.create({
      baseURL: BASE_URL,
      url: "/api/user/getUserData",
    });
    instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${refreshToken}`;
      return config;
    });
    try {
      const response = await instance.get("api/auth/refresh");
      localStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserData() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken && !refreshToken) {
      return null;
    }
    const instance = axios.create({
      baseURL: BASE_URL,
      url: "/api/user",
    });
    instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    });
    try {
      const response = await instance.get("/api/user");
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const response = await this.userRefreshToken(refreshToken);
          return response.userData;
        } catch (error) {
          throw error;
        }
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
