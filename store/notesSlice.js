import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  subscribeToNotes,
  updateNote,
} from "../database/notes";

export const startNotesListener = (userId) => (dispatch) => {
  dispatch(setNotesLoading(true));
  dispatch(setNotesError(null));

  const unsubscribe = subscribeToNotes(userId, (data) => {
    dispatch(setNotes(data));
  });

  return unsubscribe;
};

export const createNoteAsync = createAsyncThunk("notes/createNote", async ({ userId, noteData }) => {
  await createNote(userId, noteData);
});

export const getNotesAsync = createAsyncThunk("notes/getNotes", async (userId) => {
  return await getAllNotes(userId);
});

export const getNoteByIdAsync = createAsyncThunk(
  "notes/getNoteById",
  async (noteId, { rejectWithValue }) => {
    const note = await getNoteById(noteId);
    if (!note) {
      return rejectWithValue("NOTE_NOT_FOUND");
    }
    return note;
  }
);

export const updateNoteAsync = createAsyncThunk("notes/updateNote", async ({ noteId, noteData }) => {
  await updateNote(noteId, noteData);
});

export const deleteNoteAsync = createAsyncThunk("notes/deleteNote", async (noteId) => {
  await deleteNote(noteId);
});

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
    setNotesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setNotes, setNotesLoading, setNotesError } = notesSlice.actions;
export default notesSlice.reducer;
