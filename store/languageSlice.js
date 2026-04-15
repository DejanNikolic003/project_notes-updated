import { createSlice } from "@reduxjs/toolkit";

const detectedLocale = Intl.DateTimeFormat().resolvedOptions().locale || "en";
const initialLanguage = detectedLocale.toLowerCase().startsWith("sr") ? "sr" : "en";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    code: initialLanguage,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.code = action.payload === "sr" ? "sr" : "en";
    },
    toggleLanguage: (state) => {
      state.code = state.code === "sr" ? "en" : "sr";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
