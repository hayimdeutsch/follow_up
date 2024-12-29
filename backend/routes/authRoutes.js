import { Router } from "express";
import {
  checkApprovalStatus,
  saveRedirectToSession,
  initiateGoogleAuth,
  googleAuthCallbackRedirect,
  logout,
  getUser,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/check-approval", checkApprovalStatus);

authRouter.get("/google", saveRedirectToSession, initiateGoogleAuth);

authRouter.get("/google/callback", googleAuthCallbackRedirect);

authRouter.get("/logout", logout);

authRouter.get("/user", getUser);

export default authRouter;
