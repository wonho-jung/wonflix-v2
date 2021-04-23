import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentPlan: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    set_CurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
  },
});

export const { login, logout, set_CurrentPlan } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectCurrentPlan = (state) => state.user.currentPlan;
export default userSlice.reducer;
