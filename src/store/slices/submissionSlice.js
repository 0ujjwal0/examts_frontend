// slices/submissionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submissions: [],
  currentSubmission: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    createSubmission(state, action) {
      state.submissions.push(action.payload);
    },
    updateSubmission(state, action) {
      const index = state.submissions.findIndex(
        (submission) => submission._id === action.payload._id
      );
      if (index !== -1) {
        state.submissions[index] = action.payload;
      }
    },
    deleteSubmission(state, action) {
      state.submissions = state.submissions.filter(
        (submission) => submission._id !== action.payload
      );
    },
  },
});

export const { createSubmission, updateSubmission, deleteSubmission } =
  submissionSlice.actions;
export default submissionSlice.reducer;
