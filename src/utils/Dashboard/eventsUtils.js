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
        .filter((event) =>
            dayjs(event.start_date).isAfter(tomorrow.subtract(1, "second"))
        ) // starts from tomorrow
        .sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)));

    if (upcoming.length === 0) return null;

    const nextEvent = upcoming[0];
    const daysUntil = dayjs(nextEvent.start_date)
        .startOf("day")
        .diff(dayjs().startOf("day"), "day");

    return {
        nextEvent,
        daysUntil,
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

/**
 * Filters events that occur on a specific day.
 *
 * @param {Date | string | dayjs.Dayjs} targetDate - The date to check.
 * @param {Array} events - Array of event objects with start_date and end_date.
 * @returns {Array} Filtered events that happen on the given date.
 */
export function getEventsForDate(targetDate, events = []) {
    const day = dayjs(targetDate);

    return events.filter((event) =>
        day.isBetween(
            dayjs(event.start_date).startOf("day"),
            dayjs(event.end_date).endOf("day"),
            null,
            "[]"
        )
    );
}

export function formatDateShort(dateString) {
    if (!dateString) return "";
    return dayjs(dateString).format("DD/MM/YY");
}

export function getCoverURL(k) {
    const coverURL = ["https://i.imgur.com/bueCEF8.png","https://i.imgur.com/Ab94jXb.png","https://i.imgur.com/VoEbc7P.png","https://i.imgur.com/JVrU31v.png"];
    return coverURL[k%4]
}

export function formatRange(start, end) {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (startDate.isSame(endDate, 'day')) {
        return startDate.format("MMMM D, YYYY"); // e.g. "July 17, 2025"
    }

    if (startDate.isSame(endDate, 'month')) {
        return `${startDate.format("MMMM D")} – ${endDate.format("D, YYYY")}`;
    }

    return `${startDate.format("MMMM D")} – ${endDate.format("MMMM D, YYYY")}`;
}