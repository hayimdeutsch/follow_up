import express from "express";
import cors from "cors";
import "dotenv/config.js";

import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
