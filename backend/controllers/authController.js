import passport from "../config/passportConfig.js";
import CustomError from "../utils/CustomError.js";
import { isUserApproved } from "../services/dbService.js";
import googleConfig from "../config/googleConfig.js";

const checkApprovalStatus = async (req, res, next) => {
  const { gmail } = req.body;
  // console.log("gmail", gmail);
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

const saveRedirectToSession = (req, res, next) => {
  const returnURL = decodeURIComponent(req?.query?.returnTo);
  const redirectTo = returnURL || `${process.env.FRONTEND_URL}/`;
  req.session.redirect = redirectTo;
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

const initiateGoogleAuth = passport.authenticate("google", {
  scope: googleConfig.scopes,
  accessType: googleConfig.accessType,
});

const googleAuthCallbackRedirect = (req, res, next) => {
  const redirectTo = req.session.redirect || `${process.env.FRONTEND_URL}/`;
  console.log("req.session before passport.authenticate", req.session);

  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/`);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      console.log("req.session after passport.authenticate", req.session);

      res.redirect(redirectTo);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
};

const getUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    next(new CustomError("Not authenticated", 401));
  }
};

export {
  checkApprovalStatus,
  saveRedirectToSession,
  initiateGoogleAuth,
  googleAuthCallbackRedirect,
  logout,
  getUser,
};
