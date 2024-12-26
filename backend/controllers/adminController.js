import CustomError from "../utils/CustomError.js";
import * as dbService from "../services/dbService.js";

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

const createTemplateQuestionnaire = async (req, res, next) => {
  const { title, description, questions } = req.body;
  if (!title || !description || !questions) {
    return next(new CustomError("Missing required fields", 400));
  }
  try {
    const templateQuestionnaire = await dbService.createTemplate(
      title,
      description,
      questions
    );
    res.status(201).json(templateQuestionnaire);
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
  getUsers,
  approveUser,
  createTemplateQuestionnaire,
  createUserAndApprove,
};
