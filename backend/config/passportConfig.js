import "dotenv/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import oauthConfig from "./googleConfig.js";
import {
  saveUser,
  getTeacherByGmail,
  getTeacherByGoogleId,
} from "../services/dbService.js";

passport.serializeUser((teacher, done) => {
  console.log("serializing teacher", teacher);
  done(null, teacher.googleId);
});

// passport.deserializeUser((teacher, done) => {
//   console.log("deserializing teacher", teacher);
//   done(null, teacher);
// });

passport.deserializeUser(async (id, done) => {
  try {
    const teacher = await getTeacherByGoogleId(id);
    console.log("deserializing teacher", teacher);
    done(null, teacher);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    oauthConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        let teacher = await getTeacherByGoogleId(profile.id);
        if (!teacher) {
          teacher = await getTeacherByGmail(profile.emails[0].value);
          console.log("teacher before tokens saved", teacher);
          teacher.googleId = profile.id;
          teacher.googleTokens = {
            accessToken,
            refreshToken,
          };
        } else {
          teacher.googleTokens.accessToken = accessToken;
        }
        console.log("teacher with tokens", teacher);
        await saveUser(teacher);
        done(null, teacher);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
