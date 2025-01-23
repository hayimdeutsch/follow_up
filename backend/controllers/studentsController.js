import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";
import validateHasFields from "../utils/validateHasFields.js";

const createStudent = async (req, res, next) => {
  try {
    const teacher = await dbService.getTeacherById(req.user.id);
    validateHasFields(req.body, [
      "firstName",
      "lastName",
      "email",
      "eventDate",
      "scheduledEmails",
    ]);

    const newStudent = await dbService.createStudent({
      teacher: teacher._id,
      ...req.body,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

const getStudentsByTeacher = async (req, res, next) => {
  try {
    const students = await dbService.getStudentsByTeacherId(req.user.id);
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await dbService.getStudentById(studentId);
    if (!student) {
      throw new CustomError("Student not found", 404);
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudentEmails = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    validateHasFields(req.body, ["scheduledEmails"]);
    const student = await dbService.updateStudentEmails(
      studentId,
      req.body.scheduledEmails
    );
    if (!student) {
      throw new CustomError("Student not found", 404);
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await dbService.deleteStudentById(studentId);
    if (!deletedStudent) {
      throw new CustomError("Student not found", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  createStudent,
  getStudent,
  getStudentsByTeacher,
  updateStudentEmails,
  deleteStudent,
};
