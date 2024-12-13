// routes/authRoutes.js
import {
  initiateGoogleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/authController.js";

authRouter.get("/google", initiateGoogleAuth);
authRouter.get("/google/callback", googleAuthCallback);
authRouter.get("/logout", logout);
