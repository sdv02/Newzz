import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  email: string;
  name: string;
  password: string;
};
type AuthType = {
  isLoggedIn: boolean;
  user: UserType;
};

type InitialState = {
  value: AuthType;
};

const initialState = {
  value: {
    isLoggedIn: false,
    user: { email: "", name: "", password: "" },
  } as AuthType,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action) => {
      return {
        value: {
          isLoggedIn: true,
          user: action.payload,
        },
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
