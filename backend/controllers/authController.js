import passport from "../config/passportConfig.js";
import CustomError from "../utils/CustomError.js";
import * as dbService from "../services/dbService.js";
import googleConfig from "../config/googleConfig.js";
import validateHasFields from "../utils/validateHasFields.js";

// Tested routes that could be tested without changing redirect using mockAuthenticated

const checkApprovalStatus = async (req, res, next) => {
  try {
    const { email } = req.body;
    validateHasFields(req.body, ["email"]);
    const user = await dbService.getTeacherByGmail(email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const isApproved = await dbService.isUserApproved(email);
    if (!isApproved) {
      throw new CustomError("User not yet approved", 401);
    }
    res.status(200).json({ message: "User is approved" });
  } catch (error) {
    next(error);
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
  res.status(200).json(req.user);
};

export {
  checkApprovalStatus,
  saveRedirectToSession,
  initiateGoogleAuth,
  googleAuthCallbackRedirect,
  logout,
  getUser,
};
