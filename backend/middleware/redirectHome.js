export default (req, res, next) => {
  res.redirect(`${process.env.FRONTEND_URL}/`);
};
