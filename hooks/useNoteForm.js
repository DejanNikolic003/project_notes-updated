import { useState } from "react";
import { COLORS } from "../constants/constants";

export function useNoteForm(noteId) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState(COLORS[0]);
  const [pinned, setPinned] = useState(false);
  const [reminderKey, setReminderKey] = useState("none");
  const [reminderAt, setReminderAt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(noteId));

  const resetFields = () => {
      setTitle("");
      setContent("");
      setTags([]);
      setColor(COLORS[0]);
      setPinned(false);
      setReminderKey("none");
      setReminderAt(null);
      setSaving(false);
  };

  return {
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
  };
}
