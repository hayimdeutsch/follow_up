import { addStudent } from "../services/dbService.js";

const viewStudents = async (req, res, next) => {
  try {
    res.status(200).json({ message: "View all students" });
  } catch (error) {
    next(error);
  }
};

const viewStudentById = async (req, res, next) => {
  try {
    res.status(200).json({ message: `View student with ID ${req.params.id}` });
  } catch (error) {
    next(error);
  }
};

const addStudent = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Student added" });
  } catch (error) {
    next(error);
  }
};

const createQuestionnaire = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Questionnaire created" });
  } catch (error) {
    next(error);
  }
};

const sendEmail = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    next(error);
  }
};

export {
  viewStudents,
  viewStudentById,
  addStudent,
  createQuestionnaire,
  sendEmail,
};
