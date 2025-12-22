import { Text, TouchableOpacity, View } from "react-native";

export default function NotesFilters({
  theme,
  filter,
  setFilter,
  sort,
  setSort,
}) {
  const filters = [
    { key: "all", label: "All" },
    { key: "pinned", label: "Pinned" },
    { key: "recent", label: "Recent" },
  ];

  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      {filters.map((chip) => {
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
              {key === "updated" ? "Recent" : "A-Z"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
