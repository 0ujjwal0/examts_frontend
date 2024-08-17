// thunks/notificationThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification,removeNotification } from "../slices/notificationSlice";
export const addNotificationThunk = createAsyncThunk(
  "notification/addNotification",
  async (notification, { dispatch }) => {
    dispatch(addNotification(notification));
  }
);

export const removeNotificationThunk = createAsyncThunk(
  "notification/removeNotification",
  async (id, { dispatch }) => {
    dispatch(removeNotification(id));
  }
);
