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


const setAuthHeader = (token: any) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const token = localStorage.getItem("accessToken")

let token;
if (typeof window !== 'undefined') {
  token = localStorage.getItem("accessToken");
}

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

export const AddToFavorite = createAppAsyncThunk(
  "books/addToFavotive",
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/favorite`, credentials, config);
      setAuthHeader(response.data.token);
      return response.data.bookId;
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  },
);

export const GetFromFavorite = createAppAsyncThunk(
  "books/getFromFavotive",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/favorite`, config);
      return response.data;
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  },
);


export const RemoveFromFavorite = createAppAsyncThunk(
  "books/removeFromFavotive",
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/user/favorite/${credentials}`, config);
      return response.data;
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }

  },
);


