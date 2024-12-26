import "dotenv/config.js";
import CustomError from "../utils/CustomError.js";

export default (req, res, next) => {
  return next();
  if (req.user.email === process.env.ADMIN_EMAIL) {
    return next();
  }
  throw new CustomError("Forbidden", 403);
  res.status(403).json({ message: "Forbidden" });
};
