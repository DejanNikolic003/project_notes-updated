import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ensurePermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const req = await Notifications.requestPermissionsAsync();
    return req.status === "granted";
  }
  return true;
};

export const scheduleRemindersForNotes = async (notes = []) => {
  const allowed = await ensurePermission();
  if (!allowed) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = Date.now();
  const upcoming = notes.filter((n) => {
    const ts = n.reminderAt?.getTime?.();
    return ts && ts > now;
  });

  for (const note of upcoming) {
    const trigger = note.reminderAt;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${note.title} reminder`,
        body: "Open your note",
        data: { noteId: note.id },
      },
      trigger,
    });
  }
};

