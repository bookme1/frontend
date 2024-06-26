import axios, { AxiosResponse } from "axios";
import Notiflix from "notiflix";

class BookService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  }
  // Get books by name
  // public async getBooks(type: string, value: string) {
  //   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const instance = axios.create({
  //   baseURL: BASE_URL,
  //   url: "/api/book",
  //   params: {
  //     type,
  //     value,
  //   },
  //   });
  //   try {
  //     const response = await instance.get("api/book");
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
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
  //   public async getBookById(id: string) {
  //     const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //     const instance = axios.create({
  //       baseURL: BASE_URL,
  //       url: `api/book/${id}`,
  //     });
  //     try {
  //       const response = await instance.get(`api/book/${id}`);
  //       return response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  public async updateBooksFromServer() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const instance = axios.create({
      baseURL: BASE_URL,
      url: `api/book/updateBooksFromServer`,
    });
    try {
      const response = await instance.post(`api/book/updateBooksFromServer`);
    } catch (error) {
      throw error;
    }
  }

  public async makeTestCheckout(amount: number) {
    const BASE_URL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const instance = axios.create({
      baseURL: BASE_URL,
    });

    try {
      const response = await instance.post(`/api/book/checkout`, null, {
        params: { amount: Number(amount) },
      });

      const { data, signature } = response.data;

      // Динамическая загрузка LiqPayCheckout
      const script = document.createElement("script");
      script.src = "https://static.liqpay.ua/libjs/checkout.js";
      script.onload = () => {
        // @ts-ignore
        LiqPayCheckout.init({
          data: data,
          signature: signature,
          embedTo: "#liqpay",
          mode: "popup", // или 'embed'
        })
          .on("liqpay.callback", function (data: any) {
            console.log("Payment status:", data.status);
            console.log(data);
          })
          .on("liqpay.ready", function (data: any) {
            // ready
            console.log("ready");
          })
          .on("liqpay.close", function (data: any) {
            // close
            console.log("closed");
          });
      };
      document.body.appendChild(script);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const bookService = new BookService();
