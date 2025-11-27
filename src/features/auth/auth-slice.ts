import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/auth.type";

// Initial State
type AuthState = {
  user: User | null;
  token: string | null;
};
const initialState: AuthState = {
  user: null,
  token: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
