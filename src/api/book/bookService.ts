import axios, { AxiosResponse } from "axios";
import Notiflix from "notiflix";

class BookService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  }
  // Get books by name
  public async getBooks(type: string, value: string) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const instance = axios.create({
      baseURL: BASE_URL,
      url: "/api/book",
      params: {
        type,
        value,
      },
    });
    try {
      const response = await instance.get("api/book");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // public async getAllBooks() {
  //   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //   const instance = axios.create({
  //     baseURL: BASE_URL,
  //     url: "/api/book",
  //   });
  //   try {
  //     const response = await instance.get("api/book");
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  public async getBookById(id: string) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const instance = axios.create({
      baseURL: BASE_URL,
      url: `api/book/${id}`,
    });
    try {
      const response = await instance.get(`api/book/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const bookService = new BookService();
