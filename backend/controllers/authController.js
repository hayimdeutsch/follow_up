
export const initiateGoogleAuth = passport.authenticate("google");

export const googleAuthCallback = passport.authenticate("google", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
});

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};
