import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

function Loader() {
    const { theme } = useTheme();
    console.log(theme);
    return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={{ marginTop: 10, color: theme.subtext }}>Loading note...</Text>
          </View>
        );

}

export default Loader;