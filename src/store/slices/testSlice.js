import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  currentTest: null,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    fetchTestsSuccess(state, action) {
      state.tests = action.payload;
    },
    selectTest(state, action) {
      state.currentTest = action.payload;
    },
  },
});

export const { fetchTestsSuccess, selectTest } = testSlice.actions;
export default testSlice.reducer;
