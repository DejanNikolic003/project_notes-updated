import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import notesReducer from "./notesSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
