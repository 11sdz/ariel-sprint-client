import dayjs from "dayjs";


const eventColorsPalette = [
    "#4caf50", // green
    "#2196f3", // blue
    "#9c27b0", // purple
    "#ff9800", // orange
    "#f44336", // red
    "#00bcd4", // cyan
    "#795548", // brown
    "#3f51b5", // indigo
    "#009688", // teal
    "#e91e63", // pink
];



export function getNextUpcomingEvent(events) {
    if (!events || events.length === 0) return null;

    const tomorrow = dayjs().add(1, "day").startOf("day");

    const upcoming = events
        .filter(event => dayjs(event.start_date).isAfter(tomorrow.subtract(1, "second"))) // starts from tomorrow
        .sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)));

    if (upcoming.length === 0) return null;

    const nextEvent = upcoming[0];
    const daysUntil = dayjs(nextEvent.start_date).startOf("day").diff(dayjs().startOf("day"), "day");

    return {
        nextEvent,
        daysUntil
    };
}

const eventColorsMap = {};

export function getColorForType(type) {
  const key = type?.toLowerCase?.() || "default";
  if (!eventColorsMap[key]) {
    eventColorsMap[key] = eventColorsPalette.length
      ? eventColorsPalette.shift()
      : "#9e9e9e"; // fallback gray
  }
  return eventColorsMap[key];
}
