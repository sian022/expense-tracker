import { createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
  name: "currency",
  initialState: {
    selectedRow: null,
    isFormEdit: false,
  },
  reducers: {
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    setIsFormEdit: (state, action) => {
      state.isFormEdit = action.payload;
    },
  },
});

export const { setSelectedRow, setIsFormEdit } = tableSlice.actions;
