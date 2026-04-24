import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import NoteForm from "../../components/forms/NoteForm";
import Loader from "../../components/Loader";
import { auth } from "../../database/config";
import { useLanguage } from "../../hooks/useLanguage";
import { useNoteForm } from "../../hooks/useNoteForm";
import {
  createNoteAsync,
  getNoteByIdAsync,
  setNotesError,
  updateNoteAsync,
} from "../../store/notesSlice";

export default function Create() {
  const router = useRouter();
  const dispatch = useDispatch();
  const lan = useLanguage();
  const user = auth.currentUser;
  const params = useLocalSearchParams();
  const noteId = Array.isArray(params.noteId) ? params.noteId[0] : params.noteId;
  const isEditing = useMemo(() => Boolean(noteId), [noteId]);

  const {
    title, setTitle,
    content, setContent,
    tags, setTags,
    color, setColor,
    pinned, setPinned,
    reminderKey, setReminderKey,
    reminderAt, setReminderAt,
    saving, setSaving,
    loading, setLoading,
    resetFields
  } = useNoteForm(noteId);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      try {
        const note = await dispatch(getNoteByIdAsync(noteId)).unwrap();

        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags || []);
        setColor(note.color);
        setPinned(Boolean(note.pinned));
        if (note.reminderAt) {
          setReminderAt(note.reminderAt);
          setReminderKey("custom");
        }
      } catch (error) {
        if (error === "NOTE_NOT_FOUND") {
          Alert.alert(lan.NOTE_NOT_FOUND_TITLE, lan.NOTE_NOT_FOUND_MESSAGE);
          router.back();
          return;
        }
        Alert.alert(lan.NOTE_LOAD_FAILED_TITLE, lan.NOTE_LOAD_FAILED_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, router]);

  const handleSubmit = async () => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      Alert.alert(lan.NOTE_MISSING_INFO_TITLE, lan.NOTE_MISSING_INFO_MESSAGE);
      return;
    }

    if (cleanTitle.length < 3) {
      Alert.alert(lan.NOTE_INVALID_TITLE_TITLE, lan.NOTE_INVALID_TITLE_SHORT);
      return;
    }

    if (cleanContent.length < 5) {
      Alert.alert(lan.NOTE_INVALID_CONTENT_TITLE, lan.NOTE_INVALID_CONTENT_SHORT);
      return;
    }

    if (cleanTitle.length > 120) {
      Alert.alert(lan.NOTE_INVALID_TITLE_TITLE, lan.NOTE_INVALID_TITLE_LONG);
      return;
    }

    if (cleanContent.length > 5000) {
      Alert.alert(lan.NOTE_INVALID_CONTENT_TITLE, lan.NOTE_INVALID_CONTENT_LONG);
      return;
    }

    if (!user) {
      Alert.alert(lan.NOTE_NOT_SIGNED_IN_TITLE, lan.NOTE_NOT_SIGNED_IN_MESSAGE);
      router.replace("/login");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: cleanTitle,
        content: cleanContent,
        tags,
        color,
        pinned,
        reminderAt,
      };

      if (isEditing) {
        await dispatch(updateNoteAsync({ noteId, noteData: payload })).unwrap();
      } else {
        await dispatch(createNoteAsync({ userId: user.uid, noteData: payload })).unwrap();
      }

      resetFields();
      router.replace("/(tabs)/");
    } catch (error) {
      console.log("Save note error", error);
      dispatch(setNotesError(error?.message || "Cuvanje beleske nije uspelo."));
      Alert.alert(lan.NOTE_SAVE_FAILED_TITLE, lan.NOTE_SAVE_FAILED_MESSAGE);
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (<NoteForm 
      isEditing={isEditing}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      tags={tags}
      setTags={setTags}
      color={color}
      setColor={setColor}
      pinned={pinned}
      setPinned={setPinned}
      reminderKey={reminderKey}
      setReminderKey={setReminderKey}
      reminderAt={reminderAt}
      setReminderAt={setReminderAt}
      saving={saving}
      onSubmit={handleSubmit}
  />)
}