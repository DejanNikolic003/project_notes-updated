import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

const system = Appearance.getColorScheme();

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: system === "dark" ? "dark" : "light",
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload === "dark" ? "dark" : "light";
    },
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
