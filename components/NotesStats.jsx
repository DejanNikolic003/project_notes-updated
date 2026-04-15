import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";

export default function NotesStats({ total, pinned }) {
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <View
      style={{
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.shadow,
        shadowOpacity: 0.14,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ color: theme.subtext, fontSize: 12 }}>{lan.HOME_STATS_TOTAL}</Text>
        <Text style={{ color: theme.text, fontSize: 26, fontWeight: "800" }}>
          {total}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: theme.subtext, fontSize: 12 }}>{lan.HOME_STATS_PINNED}</Text>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>
          {pinned}
        </Text>
      </View>
    </View>
  );
}
