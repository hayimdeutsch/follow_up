import { Router } from "express";

import authRouter from "./authRoutes.js";
import adminRouter from "./adminRoutes.js";
import registrationRouter from "./registrationRoutes.js";
import studentsRouter from "./studentRoutes.js";
import templateRouter from "./templateRoutes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/register", registrationRouter);
mainRouter.use("/students", studentsRouter);
mainRouter.use("/templates", templateRouter);

export default mainRouter;
