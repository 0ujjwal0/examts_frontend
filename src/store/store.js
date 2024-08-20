import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    
  },
});
export const persistor = persistStore(store);
export default store;
