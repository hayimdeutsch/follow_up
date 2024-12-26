import { google } from "googleapis";
import { oauth2Client } from "../config/googleConfig.js";
import { saveUser } from "./dbService.js";

const scheduleCalendarEvent = async (user, event) => {
  try {
    const currentUser = await validateAndRefreshToken(user);
    const calendar = google.calendar({ version: "v3", auth: currentUser });
    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    return res.data;
  } catch (error) {
    console.error("Error scheduling calendar event:", error);
    throw new Error("Failed to schedule calendar event");
  }
};

const getCalendarEvents = async (user) => {
  const currentUser = await validateAndRefreshToken(user);
  const calendar = google.calendar({ version: "v3", auth: currentUser });
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
  const currentUser = await validateAndRefreshToken(user);

  const gmail = google.gmail({ version: "v1", auth: currentUser });

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

const getValidToken = async (refreshToken) => {
  oauth2Client.setCredentials({ refreshToken });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials.access_token;
};

const validateAndRefreshToken = async (user) => {
  oauth2Client.setCredentials({
    refresh_token: user.googleTokens.refreshToken,
  });

  const tokenInfo = await oauth2Client.getTokenInfo(
    user.googleTokens.accessToken
  );
  const expiryDate = tokenInfo.expiry_date;
  const currentTime = Date.now();

  if (expiryDate - currentTime < 5 * 60 * 1000) {
    const tokens = await oauth2Client.refreshAccessToken();
    user.googleTokens.accessToken = tokens.credentials.access_token;
    if (tokens.credentials.refresh_token) {
      user.googleTokens.refreshToken = tokens.credentials.refresh_token;
    }
    await saveUser(user);
    oauth2Client.setCredentials({
      access_token: tokens.credentials.access_token,
    });
  } else {
    oauth2Client.setCredentials({ access_token: user.accessToken });
  }

  return oauth2Client;
};

export {
  sendEmail,
  validateAndRefreshToken,
  getValidToken,
  scheduleCalendarEvent,
  getCalendarEvents,
};
