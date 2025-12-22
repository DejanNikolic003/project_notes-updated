import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import Note from "./Note";

export default function NotesList({
  data,
  theme,
  refreshing,
  onRefresh,
  onDelete,
  onTogglePin,
  onEdit,
  onCreate,
}) {
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
            No notes yet. Start by creating one!
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
              Create note
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}
