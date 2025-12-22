export const computeReminderDate = (key) => {
  const now = new Date();
  switch (key) {
    case "15s":
      return new Date(now.getTime() + 15 * 1000);
    case "1h":
      return new Date(now.getTime() + 60 * 60 * 1000);
    case "3h":
      return new Date(now.getTime() + 3 * 60 * 60 * 1000);
    case "tonight": {
      const d = new Date(now);
      d.setHours(20, 0, 0, 0);
      if (d < now) d.setDate(d.getDate() + 1);
      return d;
    }
    case "tomorrow": {
      const d = new Date(now);
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      return d;
    }
    case "week": {
      const d = new Date(now);
      d.setDate(d.getDate() + 7);
      d.setHours(now.getHours(), now.getMinutes(), 0, 0);
      return d;
    }
    default:
      return null;
  }
};