import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import testReducer from "./slices/testSlice";
import submissionReducer from "./slices/submissionSlice";
import notificationReducer from "./slices/notificationSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    submission: submissionReducer,
    notification: notificationReducer,
    profile: profileReducer,
  },
});

export default store;
