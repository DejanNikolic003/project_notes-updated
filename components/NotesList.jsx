import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import Note from "./Note";

export default function NotesList({
  data,
  refreshing,
  onRefresh,
  onDelete,
  onTogglePin,
  onEdit,
  onCreate,
}) {
  const { theme } = useTheme();
  const lan = useLanguage();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <Note
          note={item}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onEdit={onEdit}
        />
      )}
      contentContainerStyle={{ paddingBottom: 90 }}
      ListEmptyComponent={
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: theme.subtext, marginBottom: 10 }}>
            {lan.HOME_LIST_EMPTY}
          </Text>
          <TouchableOpacity
            onPress={onCreate}
            style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {lan.HOME_LIST_CREATE_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}
