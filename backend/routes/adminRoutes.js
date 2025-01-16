import { Router } from "express";
import userRouter from "./userRoutes.js";
import CustomError from "../utils/CustomError.js";
import validateHasFields from "../utils/validateHasFields.js";

const adminRouter = Router();
//All routes and subroutes tested using mock authentication
adminRouter.post("/check-admin", async (req, res, next) => {
  try {
    validateHasFields(req.body, ["email"]);
    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      throw new CustomError("Forbidden", 403);
    }

    res.status(200).json({ message: "Admin approved" });
  } catch (error) {
    next(error);
  }
});

adminRouter.use("/users", userRouter);

export default adminRouter;
