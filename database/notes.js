import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

const notesCollection = collection(db, "notes");

const noteFromDoc = (docSnap) => {
  const data = docSnap.data() || {};
  return {
    id: docSnap.id,
    title: data.title || "",
    content: data.content || "",
    color: data.color || "#4F46E5",
    pinned: Boolean(data.pinned),
    reminderAt: data.reminderAt?.toDate?.() || null,
    userId: data.userId,
    createdAt: data.createdAt?.toDate?.() || null,
    updatedAt: data.updatedAt?.toDate?.() || null,
  };
};

export const subscribeToNotes = (userId, onChange) => {
  const notesQuery = query(
    notesCollection,
    where("userId", "==", userId),
    orderBy("pinned", "desc"),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(notesQuery, (snapshot) => {
    const nextNotes = snapshot.docs.map(noteFromDoc);
    onChange(nextNotes);
  });
};

export const createNote = (userId, { title, content, color, pinned, reminderAt }) =>
  addDoc(notesCollection, {
    title,
    content,
    color,
    pinned: Boolean(pinned),
    reminderAt: reminderAt || null,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const updateNote = (noteId, { title, content, color, pinned, reminderAt }) =>
  updateDoc(doc(notesCollection, noteId), {
    title,
    content,
    color,
    pinned: Boolean(pinned),
    reminderAt: reminderAt || null,
    updatedAt: serverTimestamp(),
  });

export const deleteNote = (noteId) => deleteDoc(doc(notesCollection, noteId));

export const getNoteById = async (noteId) => {
  const snap = await getDoc(doc(notesCollection, noteId));
  if (!snap.exists()) {
    return null;
  }
  return noteFromDoc(snap);
};

