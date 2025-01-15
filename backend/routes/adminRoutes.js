import { Router } from "express";
import userRouter from "./userRoutes.js";
import CustomError from "../utils/CustomError.js";

const adminRouter = Router();

adminRouter.post("/check-admin", async (req, res, next) => {
  try {
    const { gmail } = req.body;
    if (!gmail) {
      throw new CustomError("Gmail is required", 400);
    }
    if (gmail !== process.env.ADMIN_EMAIL) {
      throw new CustomError("Forbidden", 403);
    }
    res.status(200).json({ message: "Admin approved" });
  } catch (error) {
    next(error);
  }
});

adminRouter.use("/users", userRouter);

export default adminRouter;
