import { Router } from "express";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import mockAuthenticated from "../mocks/mockAuthenticated.js";
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

// authRouter.get("/user", mockAuthenticated, getUser);
authRouter.get("/user", checkAuthenticated, getUser);

export default authRouter;
