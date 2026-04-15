import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {
    setNotes: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNote: (state, action) => {
      state.items.unshift(action.payload);
      state.error = null;
    },
    removeNote: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
      state.error = null;
    },
    setNotesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setNotes, addNote, removeNote, setNotesLoading, setNotesError } = notesSlice.actions;
export default notesSlice.reducer;
