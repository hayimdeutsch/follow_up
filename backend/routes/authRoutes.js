import { Router } from "express";
import redirect from "../middleware/redirect.js";
import {
  checkApprovalStatus,
  initiateGoogleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/authController.js";
import passport from "../config/passportConfig.js";

const authRouter = Router();

authRouter.post("/check-approval", checkApprovalStatus);

authRouter.get("/google", initiateGoogleAuth);

authRouter.get("/google/callback", googleAuthCallback, redirect);

authRouter.get("/logout", logout);

authRouter.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default authRouter;
