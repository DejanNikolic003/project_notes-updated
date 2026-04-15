import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/constants";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { FILTERS } from "../constants/constants";
export default function NotesFilters({
  filter,
  setFilter,
  colorFilter,
  setColorFilter,
  sort,
  setSort,
}) {
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row" }}>
        {FILTERS.map((chip) => {
          const active = filter === chip.key;
          return (
            <TouchableOpacity
              key={chip.key}
              onPress={() => setFilter(chip.key)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                marginRight: 8,
                backgroundColor: active ? theme.primary : theme.muted,
              }}
            >
              <Text style={{ color: active ? "#fff" : theme.text }}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ flex: 1 }} />

        {["updated", "title"].map((key) => {
          const active = sort === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setSort(key)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 10,
                marginLeft: 6,
                borderWidth: 1,
                borderColor: active ? theme.primary : theme.border,
              }}
            >
              <Text style={{ color: active ? theme.primary : theme.text }}>
                {key === "updated" ? lan.HOME_SORT_RECENT : lan.HOME_SORT_TITLE}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
        <Text style={{ color: theme.subtext, marginRight: 10 }}>{lan.HOME_FILTER_COLOR}</Text>

        <TouchableOpacity
          onPress={() => setColorFilter("all")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            marginRight: 8,
            backgroundColor: colorFilter === "all" ? theme.primary : theme.muted,
          }}
        >
          <Text style={{ color: colorFilter === "all" ? "#fff" : theme.text }}>{lan.HOME_FILTER_ALL}</Text>
        </TouchableOpacity>

        {COLORS.map((color) => {
          const active = colorFilter === color;
          return (
            <TouchableOpacity
              key={color}
              onPress={() => setColorFilter(color)}
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                marginRight: 8,
                backgroundColor: color,
                borderWidth: 2,
                borderColor: active ? theme.text : "transparent",
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
