// slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileSuccess(state, action) {
      state.profile = action.payload;
    },
    updateProfileSuccess(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { fetchProfileSuccess, updateProfileSuccess } =
  profileSlice.actions;
export default profileSlice.reducer;
