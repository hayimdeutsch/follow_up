import "dotenv/config.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passportConfig.js";

import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import registrationRouter from "./routes/registrationRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConfig.js";

import testRouter from "./routes/testRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "your_secret_key", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/register", registrationRouter);
app.use("/test", testRouter);

app.use(errorHandler);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server started on port ", PORT);
});
