export const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#0EA5E9"];
export const REMIND_PRESETS = [
  { key: "none", label: "No reminder" },
  { key: "15s", label: "In 15 sec (test)" },
  { key: "1h", label: "In 1 hour" },
  { key: "3h", label: "In 3 hours" },
  { key: "tonight", label: "Tonight 8 PM" },
  { key: "tomorrow", label: "Tomorrow 9 AM" },
  { key: "week", label: "Next week" },
];

export const PALETTES = {
  light: {
    mode: "light",
    background: "#F6F7FB",
    surface: "#FFFFFF",
    text: "#0F172A",
    subtext: "#6B7280",
    border: "#E5E7EB",
    primary: "#2563EB",
    secondary: "#A855F7",
    muted: "#F3F4F6",
    danger: "#DC2626",
    warning: "#F59E0B",
    success: "#10B981",
    shadow: "rgba(15, 23, 42, 0.08)",
  },
  dark: {
    mode: "dark",
    background: "#0B1220",
    surface: "#111827",
    text: "#E5E7EB",
    subtext: "#9CA3AF",
    border: "#1F2937",
    primary: "#60A5FA",
    secondary: "#C084FC",
    muted: "#1F2937",
    danger: "#FCA5A5",
    warning: "#FBBF24",
    success: "#34D399",
    shadow: "rgba(0, 0, 0, 0.4)",
  },
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FILTERS = [
  { key: "all", label: "All" },
  { key: "pinned", label: "Pinned" },
  { key: "recent", label: "Recent" },
];
