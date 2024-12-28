import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiResponseType } from "../../components/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../components/consts";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const initialState = {
  loading: false,
  headlines: [] as ApiResponseType[],
  data: [] as ApiResponseType[],
  popular: [] as ApiResponseType[],
  error: "",
};

export const fetchHeadlines = createAsyncThunk(
  "data/fetchHeadlines",
  async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
    );
    return response.data.articles;
  }
);

export const fetchData = createAsyncThunk("data/fetchData", () => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${apiKey}`
    )
    .then((response) => response.data.articles);
});

const today = new Date();
const oneWeekAgo = new Date();
oneWeekAgo.setDate(today.getDate() - 7);
const formattedToday = formatDate(today);
const formattedOneWeekAgo = formatDate(oneWeekAgo);

export const fetchPopular = createAsyncThunk("data/fetchPopular", () => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=world&from=${formattedOneWeekAgo}&to=${formattedToday}&sortBy=popularity&apiKey=${apiKey}`
    )
    .then((response) => response.data.articles);
});

export const data = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.error = "error couldnt fetch data";
    });
    builder.addCase(fetchPopular.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
    builder.addCase(fetchPopular.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchHeadlines.fulfilled, (state, action) => {
      state.headlines = action.payload;
    });
    builder.addCase(fetchHeadlines.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default data.reducer;
