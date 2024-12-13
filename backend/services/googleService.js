import { google } from "googleapis";
import oauth from "../config/oauthConfig.js";

function setOAuthClient(tokens) {
  oauth.setCredentials(tokens);
}

async function scheduleCalendarEvent(event) {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth });
    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    return res.data;
  } catch (error) {
    console.error("Error scheduling calendar event:", error);
    throw new Error("Failed to schedule calendar event");
  }
}

async function getCalendarEvents() {
  const calendar = google.calendar({ version: "v3", auth: oauth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  return res.data.items;
}

export { scheduleCalendarEvent, getCalendarEvents };
