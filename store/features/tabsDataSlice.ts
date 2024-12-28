import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiResponseType } from "../../components/types";

const initialState = {
  loading: false,
  results: [] as ApiResponseType[],
  error: "",
};
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchTabData = createAsyncThunk(
  "search/fetchTabData",
  (query: string) => {
    return axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`
      )
      .then((response) => response.data.articles);
  }
);

export const tabData = createSlice({
  name: "tabData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTabData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTabData.fulfilled, (state, action) => {
      state.results = action.payload;
    });
    builder.addCase(fetchTabData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default tabData.reducer;
