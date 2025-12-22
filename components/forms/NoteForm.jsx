import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS, REMIND_PRESETS } from "../../constants/constants";
import { styles } from "../../styles/NoteForm";
import { computeReminderDate } from "../../utils/utils";

export default function NoteForm({
  theme,
  isEditing,

  title,
  setTitle,
  content,
  setContent,

  color,
  setColor,

  pinned,
  setPinned,

  reminderKey,
  setReminderKey,
  reminderAt,
  setReminderAt,

  saving,
  onSubmit,
}) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.text }]}>
        {isEditing ? "Edit note" : "Create note"}
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>Title</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.subtext}
      />

      <Text style={[styles.label, { color: theme.subtext }]}>Content</Text>
      <TextInput
        style={[
          styles.input,
          styles.multiline,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor={theme.subtext}
      />

      <View style={styles.sectionRow}>
        <Text style={[styles.label, { color: theme.subtext }]}>
          Pin to top
        </Text>
        <Switch
          value={pinned}
          onValueChange={setPinned}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={pinned ? "#fff" : undefined}
        />
      </View>

      <Text style={[styles.label, { marginTop: 12, color: theme.subtext }]}>
        Color
      </Text>
      <View style={styles.colorRow}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setColor(c)}
            style={[
              styles.colorDot,
              {
                backgroundColor: c,
                borderColor: color === c ? theme.text : "transparent",
              },
            ]}
          />
        ))}
      </View>

      <Text style={[styles.label, { marginTop: 12, color: theme.subtext }]}>
        Reminder
      </Text>
      <View style={styles.chipRow}>
        {REMIND_PRESETS.map((opt) => {
          const active = reminderKey === opt.key;

          return (
            <TouchableOpacity
              key={opt.key}
              onPress={() => {
                setReminderKey(opt.key);
                setReminderAt(computeReminderDate(opt.key));
              }}
              style={[
                styles.reminderChip,
                {
                  backgroundColor: active ? theme.primary : theme.muted,
                  borderColor: active ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : theme.text,
                  fontWeight: "600",
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {reminderAt && (
        <Text style={{ color: theme.subtext, marginTop: -4 }}>
          Will remind on {reminderAt.toLocaleString()}
        </Text>
      )}

      <TouchableOpacity
        onPress={onSubmit}
        disabled={saving}
        style={[
          styles.button,
          { backgroundColor: saving ? "#93C5FD" : theme.primary },
        ]}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditing ? "Update note" : "Save note"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}