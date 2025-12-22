import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Alert } from "react-native";
import NoteForm from "../../components/forms/NoteForm";
import Loader from "../../components/Loader";
import { auth } from "../../database/config";
import { useNoteForm } from "../../hooks/useNoteForm";
import { useTheme } from "../../hooks/useTheme";
import { loadNote, saveNote } from "../../services/noteService";

export default function Create() {
  const router = useRouter();
  const user = auth.currentUser;
  const params = useLocalSearchParams();

  const { theme } = useTheme();
  const noteId = Array.isArray(params.noteId) ? params.noteId[0] : params.noteId;
  const isEditing = useMemo(() => Boolean(noteId), [noteId]);

  const {
    title, setTitle,
    content, setContent,
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
        const note = await loadNote(noteId);
        
        if (!note) {
          Alert.alert("Not found", "Could not load this note.");
          router.back();
          return;
        }

        setTitle(note.title);
        setContent(note.content);
        setColor(note.color);
        setPinned(Boolean(note.pinned));
        if (note.reminderAt) {
          setReminderAt(note.reminderAt);
          setReminderKey("custom");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load note. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, router]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing info", "Please add both a title and content.");
      return;
    }

    if (!user) {
      Alert.alert("Not signed in", "Please log in to save notes.");
      router.replace("/login");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        color,
        pinned,
        reminderAt,
      };

      await saveNote({ isEditing, noteId, userId: user.uid, payload })

      resetFields();
      router.replace("/(tabs)/");
    } catch (error) {
      console.log("Save note error", error);
      Alert.alert("Error", "Could not save note. Please try again.");
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (<NoteForm 
      theme={theme}
      isEditing={isEditing}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
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