import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PALETTES } from "../constants/constants";
import { toggleTheme as toggleThemeAction } from "../store/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return useMemo(() => {
    const theme = PALETTES[mode] || PALETTES.light;
    const toggleTheme = () => dispatch(toggleThemeAction());
    return { theme, mode, toggleTheme, isDark: mode === "dark" };
  }, [dispatch, mode]);
};

