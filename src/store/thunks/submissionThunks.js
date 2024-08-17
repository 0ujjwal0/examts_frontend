// thunks/submissionThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createSubmission,
  updateSubmission,
  deleteSubmission,
} from "../slices/submissionSlice";

export const createSubmissionThunk = createAsyncThunk(
  "submission/createSubmission",
  async (submission, { dispatch }) => {
    const { data } = await axios.post("/api/submissions", submission);
    dispatch(createSubmission(data));
  }
);

export const updateSubmissionThunk = createAsyncThunk(
  "submission/updateSubmission",
  async (submission, { dispatch }) => {
    const { data } = await axios.put(
      `/api/submissions/${submission._id}`,
      submission
    );
    dispatch(updateSubmission(data));
  }
);

export const deleteSubmissionThunk = createAsyncThunk(
  "submission/deleteSubmission",
  async (id, { dispatch }) => {
    await axios.delete(`/api/submissions/${id}`);
    dispatch(deleteSubmission(id));
  }
);
