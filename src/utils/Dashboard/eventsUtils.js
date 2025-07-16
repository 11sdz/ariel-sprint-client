import dayjs from "dayjs";


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
