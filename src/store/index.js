import { configureStore } from "@reduxjs/toolkit";
import api from "../lib/api";
import rootReducer from "./root";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
