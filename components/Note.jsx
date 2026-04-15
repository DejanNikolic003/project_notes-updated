import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { formatDate } from "../utils/utils";
import { STYLES } from "../styles/Note";

const Note = ({ note, onEdit, onDelete, onTogglePin }) => {
  const { theme } = useTheme();
  const lan = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View
      style={[
        STYLES.card,
        {
          borderLeftColor: note.color || theme.primary,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={STYLES.header}>
        <View style={{ flex: 1 }}>
          <Text style={[STYLES.title, { color: theme.text }]}>{note.title}</Text>
          <Text style={[STYLES.meta, { color: theme.subtext }]}>
            {formatDate(note.updatedAt) || lan.HOME_NOTE_DRAFT}
          </Text>
        </View>

        <View style={STYLES.headerIcons}>
          {note.pinned && <Ionicons name="star" size={16} color="#F59E0B" style={{ marginRight: 8 }} />}
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons name="chevron-forward-outline" size={20} color={theme.text} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={STYLES.body}>
          <Text style={[STYLES.content, { color: theme.text }]}>{note.content}</Text>
          {!!note.tags?.length && (
            <View style={STYLES.tagsRow}>
              {note.tags.map((tag) => (
                <View key={tag} style={[STYLES.tagChip, { backgroundColor: theme.muted }]}>
                  <Text style={[STYLES.tagText, { color: theme.subtext }]}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={STYLES.actions}>
            <TouchableOpacity style={STYLES.action} onPress={() => onTogglePin?.(note)}>
              <Ionicons name={note.pinned ? "star" : "star-outline"} size={18} color="#F59E0B" />
              <Text style={STYLES.actionText}>
                {note.pinned ? lan.HOME_NOTE_UNPIN : lan.HOME_NOTE_PIN}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={STYLES.action} onPress={() => onEdit?.(note)}>
              <Ionicons name="pencil" size={18} color={theme.primary} />
              <Text style={STYLES.actionText}>{lan.HOME_NOTE_EDIT}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={STYLES.action} onPress={() => onDelete?.(note)}>
              <Ionicons name="trash" size={18} color={theme.danger} />
              <Text style={[STYLES.actionText, { color: theme.danger }]}>
                {lan.HOME_NOTE_DELETE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Note;
