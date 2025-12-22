import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const Note = ({ note, onEdit, onDelete, onTogglePin }) => {
  const { theme } = useTheme();
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
        styles.card,
        {
          borderLeftColor: note.color || theme.primary,
          backgroundColor: theme.surface,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>{note.title}</Text>
          <Text style={[styles.meta, { color: theme.subtext }]}>{formatDate(note.updatedAt) || "Draft"}</Text>
        </View>

        <View style={styles.headerIcons}>
          {note.pinned && <Ionicons name="star" size={16} color="#F59E0B" style={{ marginRight: 8 }} />}
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons name="chevron-forward-outline" size={20} color={theme.text} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.body}>
          <Text style={[styles.content, { color: theme.text }]}>{note.content}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={() => onTogglePin?.(note)}>
              <Ionicons name={note.pinned ? "star" : "star-outline"} size={18} color="#F59E0B" />
              <Text style={styles.actionText}>{note.pinned ? "Unpin" : "Pin"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={() => onEdit?.(note)}>
              <Ionicons name="pencil" size={18} color={theme.primary} />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={() => onDelete?.(note)}>
              <Ionicons name="trash" size={18} color={theme.danger} />
              <Text style={[styles.actionText, { color: theme.danger }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 14,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  body: {
    marginTop: 10,
  },
  content: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },
  actionText: {
    fontSize: 14,
    color: "#1F2937",
    marginLeft: 6,
  },
});

export default Note;
