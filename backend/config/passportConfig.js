import "dotenv/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import oauthConfig from "./googleConfig.js";
import * as dbService from "../services/dbService.js";

passport.use(
  new GoogleStrategy(
    oauthConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        let teacher = await dbService.getTeacherByGoogleId(profile.id);
        if (teacher) {
          if (refreshToken) {
            teacher.googleTokens = {
              refreshToken,
              accessToken,
            };
          } else {
            teacher.googleTokens.accessToken = accessToken;
          }
        } else {
          teacher = await dbService.getTeacherByGmail(profile.emails[0].value);
          if (teacher) {
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
        await dbService.saveUser(teacher);
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
    const teacher = await dbService.getTeacherByGoogleId(id);
    const user = {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      id: teacher._id,
      phone: teacher.phone,
    };
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
