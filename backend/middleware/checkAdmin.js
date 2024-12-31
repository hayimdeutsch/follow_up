import "dotenv/config.js";
import CustomError from "../utils/CustomError.js";

export default (req, res, next) => {
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    throw new CustomError("Forbidden", 403);
  }
  return next();
};
