import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../hooks/useTheme";
import { toggleLanguage } from "../store/languageSlice";

export default function LanguageToggle() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const languageCode = useSelector((state) => state.language.code);

  return (
    <TouchableOpacity onPress={() => dispatch(toggleLanguage())} hitSlop={12}>
      <View
        style={{
          minWidth: 42,
          height: 34,
          borderRadius: 10,
          backgroundColor: theme.muted,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: theme.border,
          marginRight: 8,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ color: theme.text, fontWeight: "700" }}>
          {languageCode.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
