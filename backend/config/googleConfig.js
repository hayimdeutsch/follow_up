import { google } from "googleapis";
import "dotenv/config";
import config from "./envConfig.js";

const redirectUri = `${config.backendUrl}/auth/google/callback`;

export default {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: redirectUri,
  scopes: [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/gmail.send",
    "profile",
    "email",
  ],
  accessType: "offline",
  prompt: "consent",
};

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);
