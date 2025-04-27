import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./slice/ThemeSlice/ThemeSLice.js";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
  },
});
