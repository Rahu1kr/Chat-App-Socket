import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: true,
  reducers: {
    themeChange: state => !state,
  },
});

export const { themeChange } = ThemeSlice.actions;
export default ThemeSlice.reducer;
