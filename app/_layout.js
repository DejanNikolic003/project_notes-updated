import { Stack } from "expo-router";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { setThemeMode } from "../store/themeSlice";

function ThemeSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const current = Appearance.getColorScheme();
    dispatch(setThemeMode(current === "dark" ? "dark" : "light"));

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setThemeMode(colorScheme === "dark" ? "dark" : "light"));
    });

    return () => subscription?.remove();
  }, [dispatch]);

  return null;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeSync />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
