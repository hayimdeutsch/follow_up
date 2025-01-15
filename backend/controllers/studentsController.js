import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";

const createStudent = async (req, res, next) => {
  try {
    const teacher = await dbService.getTeacherByGoogleId(req.user.googleId);
    const { firstName, lastName, email, eventDate, scheduledEmails } = req.body;
    if (!firstName || !lastName || !email || !eventDate || !scheduledEmails) {
      throw new CustomError("Missing required fields", 400);
    }
    const newStudent = await dbService.addStudent(
      teacher,
      firstName,
      lastName,
      email,
      eventDate,
      scheduledEmails
    );
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

const getStudentsByTeacher = async (req, res, next) => {
  try {
    const studentsObject = await dbService.getStudentsbyGoogleId(
      req.user.googleId
    );
    res.status(200).json({ students: studentsObject.students });
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
  const { studentId } = req.params;
  const { scheduledEmails } = req.body;
  try {
    if (!scheduledEmails) {
      throw new CustomError("Missing required fields", 400);
    }
    const student = await dbService.updateStudentEmails(
      studentId,
      scheduledEmails
    );
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const deletedStudent = await dbService.deleteStudentById(studentId);
    if (!deletedStudent) {
      throw new CustomError("Student not found", 404);
    }
    res.status(204).json({ message: "Student deleted" });
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
