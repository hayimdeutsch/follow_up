import { google } from "googleapis";
import { oauth2Client } from "../config/googleConfig.js";
import { saveUser } from "./dbService.js";

const scheduleCalendarEvent = async (user, eventObject) => {
  try {
    const currentOAuthClient = await getValidToken(user);
    const calendar = google.calendar({
      version: "v3",
      auth: currentOAuthClient,
    });

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventObject,
      conferenceDataVersion: 1,
    });

    return event.data;
  } catch (error) {
    console.error("Error scheduling calendar event:", error);
    throw new Error("Failed to schedule calendar event");
  }
};

const getCalendarEvents = async (user) => {
  const currentOAuthClient = await getValidToken(user);
  const calendar = google.calendar({ version: "v3", auth: currentOAuthClient });

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  return res.data.items;
};

const sendEmail = async (user, to, subject, message) => {
  console.log("user: ", user);
  const currentOAuthClient = await getValidToken(user);

  const gmail = google.gmail({ version: "v1", auth: currentOAuthClient });

  const email = [
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const base64EncodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: base64EncodedEmail,
    },
  });
};

const getValidToken = async (user) => {
  console.log("user: ", user);
  oauth2Client.setCredentials({
    refresh_token: user.googleTokens.refreshToken,
  });

  try {
    const tokens = await oauth2Client.refreshAccessToken();
    user.googleTokens.accessToken = tokens.credentials.access_token;
    if (tokens.credentials.refresh_token) {
      user.googleTokens.refreshToken = tokens.credentials.refresh_token;
    }
    await saveUser(user);
    oauth2Client.setCredentials({
      access_token: tokens.credentials.access_token,
    });
  } catch (error) {
    throw new Error("Failed to refresh token");
  }

  return oauth2Client;
};

export { sendEmail, getValidToken, scheduleCalendarEvent, getCalendarEvents };
