import "dotenv/config.js";
import { Router } from "express";

import CustomError from "../utils/CustomError.js";
import { createUser } from "../services/dbService.js";
import validateHasFields from "../utils/validateHasFields.js";
import { sendFromSystem } from "../services/emailService.js";
import { newUserApplicationTemplate } from "../utils/emailTemplates.js";

const registrationRouter = Router();

// Route has been tested
registrationRouter.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    validateHasFields(req.body, ["firstName", "lastName", "email", "phone"]);

    if (!email.endsWith("@gmail.com")) {
      throw new CustomError("Only gmail accounts are allowed", 400);
    }

    await createUser(firstName, lastName, email, phone);

    await sendFromSystem(
      process.env.ADMIN_EMAIL,
      "New User Registration",
      newUserApplicationTemplate({ firstName, lastName, email, phone })
    );

    res.status(201).json({ message: "Application successfully submitted" });
  } catch (error) {
    next(error);
  }
});

export default registrationRouter;
