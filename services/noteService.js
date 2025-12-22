import { createNote, getNoteById, updateNote } from "../database/notes";

export async function loadNote(noteId) {
  return await getNoteById(noteId);
}

export async function saveNote({ isEditing, noteId, userId, payload }) {
  if (isEditing) {
    return updateNote(noteId, payload);
  }
  return createNote(userId, payload);
}