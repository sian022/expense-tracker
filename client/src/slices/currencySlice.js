import { createSlice } from "@reduxjs/toolkit";

const storedCurrency = localStorage.getItem("currency") || "USD";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: storedCurrency,
  },
  reducers: {
    setCurrency: (state, action) => {
      localStorage.setItem("currency", action.payload);
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
