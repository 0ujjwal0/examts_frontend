import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import testReducer from "./slices/testSlice";
import submissionReducer from "./slices/submissionSlice";
import storage from "redux-persist/lib/storage";
import { persistStore,persistReducer } from "redux-persist";


const persistConfig={
  key:'root',
  storage,
}
const persistedAuthReducer=persistReducer(persistConfig,authReducer)
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    test: testReducer,
    submission: submissionReducer,
  },
});
export const persistor=persistStore(store);
export default store;
