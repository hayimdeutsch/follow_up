import CustomError from "../utils/CustomError.js";
import * as dbService from "../services/dbService.js";

const getPendingUsers = async (req, res, next) => {
  try {
    const pendingTeachers = await dbService.getUnapprovedTeachers();
    res.status(200).json(pendingTeachers || []);
  } catch (error) {
    next(error);
  }
};

const getApprovedUsers = async (req, res, next) => {
  try {
    const approvedTeachers = await dbService.getApprovedTeachers();
    res.status(200).json(approvedTeachers || []);
  } catch (error) {
    next(error);
  }
};

const approveUser = async (req, res, next) => {
  console.log("req.params", req.params);
  const { gmail } = req.params;
  try {
    const user = await dbService.approveUser(gmail);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    res.status(200).json({ message: "User approved successfully" });
  } catch (error) {
    next(error);
  }
};

const createUserAndApprove = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await dbService.createApprovedUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export {
  getPendingUsers,
  getApprovedUsers,
  approveUser,
  createUserAndApprove,
  checkAdminForLogin,
};
