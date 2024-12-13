import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Teacher from "../models/Teacher.js";

passport.serializeUser((teacher, done) => {
  done(null, teacher.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const teacher = await Teacher.findById(id);
    done(null, teacher);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/gmail.send",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let teacher = await Teacher.findOne({ googleId: profile.id });

        if (!teacher) {
          teacher = await Teacher.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            picture: profile.photos[0].value,
            googleTokens: {
              accessToken,
              refreshToken,
            },
          });
        } else {
          teacher.googleTokens = { accessToken, refreshToken };
          await teacher.save();
        }
        return done(null, teacher);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
