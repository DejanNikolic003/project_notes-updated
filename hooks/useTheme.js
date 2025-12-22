import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import { PALETTES } from "../constants/constants";


const ThemeContext = createContext({
  theme: PALETTES.light,
  mode: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const system = Appearance.getColorScheme();
  const [mode, setMode] = useState(system === "dark" ? "dark" : "light");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(colorScheme === "dark" ? "dark" : "light");
    });
    return () => subscription?.remove();
  }, []);

  const value = useMemo(() => {
    const theme = PALETTES[mode] || PALETTES.light;
    const toggleTheme = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));
    return { theme, mode, toggleTheme, isDark: mode === "dark" };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

