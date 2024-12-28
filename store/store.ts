import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dataReducer from "./features/dataSlice";
import searchReducer from "./features/searchSlice";
import tabDataReducer from "./features/tabsDataSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    dataReducer,
    searchReducer,
    tabDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
