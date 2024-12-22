import "dotenv/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import oauthConfig from "./googleConfig.js";
import {
  getTeacherByGmail,
  getTeacherByGoogleId,
} from "../services/dbService.js";

passport.serializeUser((teacher, done) => {
  console.log("serializing teacher", teacher);
  done(null, teacher.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializing teacher id", id);
  done(null, id);
});

// passport.deserializeUser(async (id, done) => {
//   try {
//     const teacher = await Teacher.findById(id);
//     done(null, teacher);
//   } catch (error) {
//     done(error);
//   }
//   console.log("deserializing user id", id);
//   done(null, id);
// });

passport.use(
  new GoogleStrategy(
    oauthConfig.google,
    async (accessToken, refreshToken, profile, done) => {
      try {
        let teacher = await getTeacherByGoogleId(profile.id);
        if (!teacher) {
          teacher = await getTeacherByGmail(profile.emails[0].value);
          teacher.googleId = profile.id;
          teacher.googleTokens = {
            accessToken,
            refreshToken,
          };
        } else {
          teacher.googleTokens.accessToken = accessToken;
        }
        await teacher.save();
        done(null, teacher);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
