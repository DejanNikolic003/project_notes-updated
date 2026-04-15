import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../../database/config";
import { deleteNote, getAllNotes, updateNote } from "../../database/notes";
import { useTheme } from "../../hooks/useTheme";
import { scheduleRemindersForNotes } from "../../services/notificationService";
import {
  removeNote,
  setNotes,
  setNotesError,
  setNotesLoading,
} from "../../store/notesSlice";

import Loader from "../../components/Loader";
import NotesFilters from "../../components/NotesFilters";
import NotesList from "../../components/NotesList";
import NotesStats from "../../components/NotesStats";
import { COLORS } from "../../constants/constants";
import { useLanguage } from "../../hooks/useLanguage";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const lan = useLanguage();
  const notes = useSelector((state) => state.notes.items);
  const loading = useSelector((state) => state.notes.loading);

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [sort, setSort] = useState("updated");

  const loadAllNotes = async (userId) => {
    dispatch(setNotesLoading(true));
    try {
      const allNotes = await getAllNotes(userId);
      dispatch(setNotes(allNotes));
    } catch (error) {
      dispatch(setNotesError(error?.message || "Ucitavanje beleski nije uspelo."));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) router.replace("/login");
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;
    loadAllNotes(currentUser.uid);
  }, [currentUser, dispatch]);

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

    if (colorFilter !== "all") {
      const selectedColor = COLORS.includes(colorFilter) ? colorFilter : COLORS[0];
      pool = pool.filter((n) => (n.color || COLORS[0]) === selectedColor);
    }

    if (term) {
      pool = pool.filter(
        (n) =>
          n.title.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term) ||
          n.tags?.some((tag) => tag.toLowerCase().includes(term))
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
  }, [notes, search, filter, colorFilter, sort]);

  const listData = useMemo(() => {
    const pinned = filteredNotes.filter((n) => n.pinned);
    const others = filteredNotes.filter((n) => !n.pinned);
    return [...pinned, ...others];
  }, [filteredNotes]);

  const onRefresh = () => {
    setRefreshing(true);
    if (!currentUser) {
      setRefreshing(false);
      return;
    }
    loadAllNotes(currentUser.uid).finally(() => {
      setRefreshing(false);
    });
  };

  const handleDelete = async (note) => {
    try {
      await deleteNote(note.id);
      dispatch(removeNote(note.id));
    } catch (e) {
      console.log(e);
      dispatch(setNotesError(e?.message || "Brisanje beleske nije uspelo."));
    }
  };

  const handleTogglePin = async (note) => {
    try {
      await updateNote(note.id, { ...note, pinned: !note.pinned });
      if (currentUser) {
        loadAllNotes(currentUser.uid);
      }
    } catch (e) {
      console.log(e);
      dispatch(setNotesError(e?.message || "Azuriranje beleske nije uspelo."));
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
            {lan.HOME_GREETING(currentUser.email)}
          </Text>
        )}

        <NotesStats
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
            placeholder={lan.HOME_SEARCH_PLACEHOLDER}
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, height: 44, color: theme.text }}
            placeholderTextColor={theme.subtext}
          />
        </View>

        <NotesFilters
          filter={filter}
          setFilter={setFilter}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          sort={sort}
          setSort={setSort}
        />

        <NotesList
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
            {lan.HOME_NEW_NOTE_BUTTON}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
