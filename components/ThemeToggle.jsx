import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { mode, toggleTheme, theme } = useTheme();
  const isDark = mode === "dark";

  return (
    <TouchableOpacity onPress={toggleTheme} hitSlop={12}>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: theme.muted,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Ionicons name={isDark ? "sunny" : "moon"} size={18} color={theme.text} />
      </View>
    </TouchableOpacity>
  );
};

export default ThemeToggle;

