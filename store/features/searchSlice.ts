import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiResponseType } from "../../components/types";

const initialState = {
  loading: false,
  searchResults: [] as ApiResponseType[],
  error: "",
};
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchReults",
  (query: string) => {
    return axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&searchIn=title&sortBy=publishedAt&apiKey=${API_KEY}`
      )
      .then((response) => response.data.articles);
  }
);

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default search.reducer;
