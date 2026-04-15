import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

export default function TabLayout() {
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext,
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LanguageToggle />
            <ThemeToggle />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: lan.HOME_TAB_TITLE,
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: lan.CREATE_TAB_TITLE,
          tabBarIcon: ({ color, size }) => <Icon name="add-circle" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: lan.LOGOUT_TAB_TITLE,
          tabBarIcon: ({ color, size }) => <Icon name="log-out-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
