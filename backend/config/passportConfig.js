import "dotenv/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import oauthConfig from "./googleConfig.js";
import {
  saveUser,
  getTeacherByGmail,
  getTeacherByGoogleId,
} from "../services/dbService.js";

passport.use(
  new GoogleStrategy(
    oauthConfig,
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile: ", profile);
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      try {
        let teacher = await getTeacherByGoogleId(profile.id);
        if (teacher) {
          console.log("teacher found by google id: ", teacher);
          if (refreshToken) {
            teacher.googleTokens = {
              refreshToken,
              accessToken,
            };
          } else {
            teacher.googleTokens.accessToken = accessToken;
          }
        } else {
          teacher = await getTeacherByGmail(profile.emails[0].value);
          if (teacher) {
            console.log("teacher found by gmail: ", teacher);
            teacher.googleId = profile.id;
            teacher.googleTokens = {
              accessToken,
              refreshToken,
            };
          } else {
            return done(null, false, {
              message: "Teacher not found",
            });
          }
        }
        console.log("teacher to save: ", teacher);
        await saveUser(teacher);
        done(null, teacher);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((teacher, done) => {
  done(null, teacher.googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const teacher = await getTeacherByGoogleId(id);
    // console.log("deserializing teacher", teacher);
    done(null, teacher);
  } catch (error) {
    done(error);
  }
});

export default passport;
