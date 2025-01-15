import "dotenv/config.js";
import { Router } from "express";

import CustomError from "../utils/CustomError.js";
import { createUser } from "../services/dbService.js";
import { sendFromSystem } from "../services/emailService.js";
import { newUserApplicationTemplate } from "../utils/emailTemplates.js";

const registrationRouter = Router();

registrationRouter.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, gmail, phone } = req.body;

    if (!firstName || !lastName || !gmail || !phone) {
      throw new CustomError("All fields are required", 400);
    }

    await createUser(firstName, lastName, gmail, phone);

    await sendFromSystem(
      process.env.ADMIN_EMAIL,
      "New User Registration",
      newUserApplicationTemplate({ firstName, lastName, gmail, phone })
    );

    res.status(201).json({ message: "Application successfully submitted" });
  } catch (error) {
    next(error);
  }
});

export default registrationRouter;
