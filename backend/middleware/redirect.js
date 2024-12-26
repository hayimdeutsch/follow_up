export default (req, res, next) => {
  const redirectTo = req.session.redirectTo || `${process.env.FRONTEND_URL}/`;
  delete req.session.redirectTo;
  res.redirect(redirectTo);
};
