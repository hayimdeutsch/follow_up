import { isUserApproved } from "../services/dbService";

const checkApproval = async (req, res, next) => {
  const { gmail } = req.body;

  if (!gmail) {
    return res.status(400).json({ message: "Gmail is required" });
  }

  let isApproved;
  try {
    isApproved = await isUserApproved(gmail);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  if (isApproved) {
    return res.status(200).json({ message: "User is approved" });
  } else {
    return res.status(401).json({ message: "User not yet approved" });
  }
};

export default checkApproval;
