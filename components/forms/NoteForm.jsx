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
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { styles } from "../../styles/NoteForm";
import { computeReminderDate } from "../../utils/utils";

export default function NoteForm({
  isEditing,

  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,

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
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.header, { color: theme.text }]}>
        {isEditing ? lan.NOTE_EDIT_TITLE : lan.NOTE_CREATE_TITLE}
      </Text>

      <Text style={[styles.label, { color: theme.subtext }]}>{lan.NOTE_TITLE_LABEL}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder={lan.NOTE_TITLE_PLACEHOLDER}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.subtext}
      />

      <Text style={[styles.label, { color: theme.subtext }]}>{lan.NOTE_CONTENT_LABEL}</Text>
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
        placeholder={lan.NOTE_CONTENT_PLACEHOLDER}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor={theme.subtext}
      />

      <Text style={[styles.label, { color: theme.subtext }]}>{lan.NOTE_TAGS_LABEL}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder={lan.NOTE_TAGS_PLACEHOLDER}
        value={tags.join(", ")}
        onChangeText={(text) => {
          const nextTags = text
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 10);
          setTags([...new Set(nextTags)]);
        }}
        placeholderTextColor={theme.subtext}
      />

      <View style={styles.sectionRow}>
        <Text style={[styles.label, { color: theme.subtext }]}>
          {lan.NOTE_PIN_LABEL}
        </Text>
        <Switch
          value={pinned}
          onValueChange={setPinned}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={pinned ? "#fff" : undefined}
        />
      </View>

      <Text style={[styles.label, { marginTop: 12, color: theme.subtext }]}>
        {lan.NOTE_COLOR_LABEL}
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
        {lan.NOTE_REMINDER_LABEL}
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
          {lan.NOTE_REMINDER_PREVIEW(reminderAt.toLocaleString())}
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
            {isEditing ? lan.NOTE_UPDATE_BUTTON : lan.NOTE_SAVE_BUTTON}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}