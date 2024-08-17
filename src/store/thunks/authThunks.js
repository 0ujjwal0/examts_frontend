// thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "../slices/authslice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    const { data } = await axios.post("/api/user/login", { email, password });
    dispatch(loginSuccess(data));
  }
);
