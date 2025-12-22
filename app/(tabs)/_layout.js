import { Tabs } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => <Icon name="add-circle" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => <Icon name="log-out-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
