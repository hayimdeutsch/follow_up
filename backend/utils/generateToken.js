import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(8).toString("hex");
}

export default generateToken;
