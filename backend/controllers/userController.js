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
  const { userId } = req.params;
  try {
    const user = await dbService.approveUserById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    res.status(200).json({ message: "User approved successfully" });
  } catch (error) {
    next(error);
  }
};

const createApprovedUser = async (req, res, next) => {
  const { firstName, lastName, phone, gmail } = req.body;
  try {
    if (!firstName || !lastName || !phone || !gmail) {
      throw new CustomError("Missing required fields", 400);
    }
    const newUser = await dbService.createApprovedUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await dbService.deleteUserById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getPendingUsers,
  getApprovedUsers,
  approveUser,
  deleteUser,
  createApprovedUser,
};
