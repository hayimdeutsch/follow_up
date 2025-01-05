const mockAuthenticated = (req, res, next) => {
  req.user = {
    _id: "676c4801dcf4b42fcbcaba97",
    email: "chayimdeutsch@gmail.com",
    googleId: "113882388930598865430",
  };
  next();
};

export default mockAuthenticated;
