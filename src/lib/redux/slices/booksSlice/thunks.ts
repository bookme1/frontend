import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";

import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchAllBooks = createAppAsyncThunk(
  "books/fetchAllBooks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/book`);
      return response.data;
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  },
);





export const fetchBooksById = createAppAsyncThunk(
  'books/fetchBooksById',
  async (id, thunkAPI) => {

    try {
      const response = await axios.get(`${BASE_URL}/api/book/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);