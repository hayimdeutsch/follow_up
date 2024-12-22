import { getCalendarEvents, scheduleCalendarEvent } from "./googleService.js";

const scheduleEvent = async (user, summary, time, duration) => {
  const event = {
    summary,
    start: { dateTime: time },
    end: { dateTime: time + duration },
  };
  try {
    const event = await scheduleCalendarEvent(user, event);
    return event;
  } catch (error) {
    console.error("Failed to schedule event", error);
  }
};
