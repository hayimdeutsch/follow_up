import passport from "../config/passportConfig.js";
import CustomError from "../utils/CustomError.js";
import { isUserApproved } from "../services/dbService.js";
import { googleConfig } from "../config/googleConfig.js";

export const checkApprovalStatus = async (req, res, next) => {
  const { gmail } = req.body;

  if (!gmail) {
    return next(new CustomError("Gmail is required", 400));
  }

  let isApproved;
  try {
    isApproved = await isUserApproved(gmail);
  } catch (error) {
    return next(error);
  }
  if (isApproved) {
    return res.status(200).json({ message: "User is approved" });
  } else {
    next(new CustomError("User not yet approved", 401));
  }
};

export const initiateGoogleAuth = passport.authenticate("google", {
  scope: googleConfig.scopes,
  accessType: googleConfig.accessType,
});

export const googleAuthCallback = passport.authenticate("google", {
  successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
  failureRedirect: `${process.env.FRONTEND_URL}/`,
});

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
};
