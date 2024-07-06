import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { currencySlice } from "../slices/currencySlice";
import { tableSlice } from "../slices/tableSlice";

// Configure Redux store using configureStore function
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add API reducer from RTK Query
    currency: currencySlice.reducer, // Add currencySlice reducer
    table: tableSlice.reducer, // Add tableSlice reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]), // Add RTK Query middleware
});

// Setup listeners for RTK Query endpoints
setupListeners(store.dispatch);

export default store;
