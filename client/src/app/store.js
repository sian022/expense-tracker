import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { currencySlice } from "../slices/currencySlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currency: currencySlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]),
});

setupListeners(store.dispatch);

export default store;
