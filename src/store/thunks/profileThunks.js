// thunks/profileThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchProfileSuccess,
  updateProfileSuccess,
} from "../slices/profileSlice";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch }) => {
    const { data } = await axios.get("/api/profile");
    dispatch(fetchProfileSuccess(data));
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profile, { dispatch }) => {
    const { data } = await axios.put("/api/profile", profile);
    dispatch(updateProfileSuccess(data));
  }
);
