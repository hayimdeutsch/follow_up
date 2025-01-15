import "dotenv/config.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import passport from "./config/passportConfig.js";

import mainRouter from "./routes/mainRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConfig.js";

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
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: process.env.LOCAL_MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", mainRouter);

app.use(errorHandler);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server started on port ", PORT);
});
