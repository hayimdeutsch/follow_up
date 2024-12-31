import CustomError from "../utils/CustomError.js";
import * as dbService from "../services/dbService.js";

const checkAdminForLogin = async (req, res, next) => {
  try {
    const { gmail } = req.body;
    if (gmail !== process.env.ADMIN_EMAIL) {
      throw new CustomError("Forbidden", 403);
    }
    res.status(200).json({ message: "Admin approved" });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const teachers = await dbService.getAllTeachers();
    res.status(200).json(teachers || []);
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

export { getUsers, approveUser, createUserAndApprove, checkAdminForLogin };
