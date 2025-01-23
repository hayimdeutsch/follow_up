const mockAuthenticated = (req, res, next) => {
  req.user = {
    id: "6770fcdb70be6909c4932583",
    email: "chayimdeutsch@gmail.com",
    googleId: "113882388930598865430",
  };
  next();
};

export default mockAuthenticated;
