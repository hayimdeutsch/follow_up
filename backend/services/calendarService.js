import CustomError from "../utils/CustomError.js";
import {
  getCalendarEvents,
  scheduleCalendarEvent as scheduleGoogleEvent,
} from "./googleService.js";

const scheduleCalendarEvent = async (
  teacher,
  studentName,
  studentEmail,
  selectedTimeSlot
) => {
  const event = initEventObject(
    teacher.email,
    studentName,
    studentEmail,
    selectedTimeSlot
  );
  try {
    const calendarEvent = await scheduleGoogleEvent(teacher, event);
    return calendarEvent;
  } catch (error) {
    throw new CustomError("Error scheduling event", 500, error);
  }
};

const initEventObject = (
  teacherEmail,
  studentName,
  studentEmail,
  selectedTimeSlot
) => {
  const eventObj = {
    location: "online",
    description: `Followup meeting with ${studentName}`,
    start: {
      dateTime: selectedTimeSlot.startTime,
      timeZone: "America/New_York",
    },
    end: {
      dateTime: selectedTimeSlot.endTime,
      timeZone: "America/New_York",
    },
    attendees: [{ email: studentEmail }, { email: teacherEmail }],
    reminders: {
      useDefault: true,
    },
    conferenceData: {
      createRequest: {
        requestId: "7qxalsvy0e",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };
  return eventObj;
};

export { scheduleEvent };
