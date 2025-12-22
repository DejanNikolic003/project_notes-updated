import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../../database/config";
import { deleteNote, subscribeToNotes, updateNote } from "../../database/notes";
import { useTheme } from "../../hooks/useTheme";
import { scheduleRemindersForNotes } from "../../services/notificationService";

import Loader from "../../components/Loader";
import NotesFilters from "../../components/NotesFilters";
import NotesList from "../../components/NotesList";
import NotesStats from "../../components/NotesStats";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("updated");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) router.replace("/login");
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToNotes(currentUser.uid, (nextNotes) => {
      setNotes(nextNotes);
      setLoading(false);
      setRefreshing(false);
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    scheduleRemindersForNotes(notes);
  }, [notes, currentUser]);

  const filteredNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    let pool = notes;

    if (filter === "pinned") {
      pool = notes.filter((n) => n.pinned);
    } else if (filter === "recent") {
      const now = Date.now();
      pool = notes.filter(
        (n) =>
          (n.updatedAt?.getTime?.() || 0) >
          now - 1000 * 60 * 60 * 48
      );
    }

    if (term) {
      pool = pool.filter(
        (n) =>
          n.title.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term)
      );
    }

    return [...pool].sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }
      return (
        (b.updatedAt?.getTime?.() || 0) -
        (a.updatedAt?.getTime?.() || 0)
      );
    });
  }, [notes, search, filter, sort]);

  const listData = useMemo(() => {
    const pinned = filteredNotes.filter((n) => n.pinned);
    const others = filteredNotes.filter((n) => !n.pinned);
    return [...pinned, ...others];
  }, [filteredNotes]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 400);
  };

  const handleDelete = async (note) => {
    try {
      await deleteNote(note.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTogglePin = async (note) => {
    try {
      await updateNote(note.id, { ...note, pinned: !note.pinned });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = (note) => {
    router.push({ pathname: "/(tabs)/create", params: { noteId: note.id } });
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, padding: 20 }}>
        {currentUser && (
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              color: theme.text,
              fontWeight: "700",
            }}
          >
            Hey, {currentUser.email}
          </Text>
        )}

        <NotesStats
          theme={theme}
          total={notes.length}
          pinned={notes.filter((n) => n.pinned).length}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 12,
            marginBottom: 12,
            backgroundColor: theme.surface,
          }}
        >
          <TextInput
            placeholder="Search notes"
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, height: 44, color: theme.text }}
            placeholderTextColor={theme.subtext}
          />
        </View>

        <NotesFilters
          theme={theme}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />

        <NotesList
          theme={theme}
          data={listData}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onDelete={handleDelete}
          onTogglePin={handleTogglePin}
          onEdit={handleEdit}
          onCreate={() => router.push("/(tabs)/create")}
        />

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/create")}
          activeOpacity={0.9}
          style={{
            position: "absolute",
            right: 24,
            bottom: 24,
            backgroundColor: theme.primary,
            borderRadius: 999,
            paddingHorizontal: 18,
            paddingVertical: 14,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            + New note
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
