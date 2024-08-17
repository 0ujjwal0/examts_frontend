// thunks/testThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTestsSuccess } from "../slices/testSlice";

export const fetchTests = createAsyncThunk(
  "test/fetchTests",
  async (_, { dispatch }) => {
    const { data } = await axios.get("/api/tests");
    dispatch(fetchTestsSuccess(data));
  }
);
