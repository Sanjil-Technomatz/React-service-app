import { createSlice } from "@reduxjs/toolkit";

export const dataReducer = createSlice({
  name: "Service Data",
  initialState: {
    data: [],
    singleData: {},
  },
  reducers: {
    serviceData: (state, action) => {
      state.data = action.payload;
    },
    singleData: (state, action) => {
      state.singleData = action.payload;
    },
  },
});

export const { serviceData, singleData } = dataReducer.actions;

export default dataReducer.reducer;
