import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";

function Loader() {
    const { theme } = useTheme();
    const lan = useLanguage();
    return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={{ marginTop: 10, color: theme.subtext }}>{lan.LOADING_NOTE}</Text>
          </View>
        );

}

export default Loader;