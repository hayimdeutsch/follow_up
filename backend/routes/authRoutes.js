import { Router } from "express";
import { redirectToHome } from "../controllers/redirectController.js";
import {
  checkApprovalStatus,
  initiateGoogleAuth,
  googleAuthCallback,
  logoutController,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/check-approval", checkApprovalStatus);

authRouter.get("/google", initiateGoogleAuth);

authRouter.get("/google/callback", googleAuthCallback, redirectToHome);

authRouter.get("/logout", logoutController);

export default authRouter;
