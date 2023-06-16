import { createSlice } from "@reduxjs/toolkit";

export const hoverSlice = createSlice({
  name: "hover",
  initialState: {
    value: false,
  },
  reducers: {
    setHover: (state, action) => {
      console.log("[hoverSlice][setHover]");
      state.value = action.payload;
    },
  },
});

export const { setHover } = hoverSlice.actions;

export default hoverSlice.reducer;
