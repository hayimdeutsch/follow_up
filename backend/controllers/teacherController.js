import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";

const viewStudents = async (req, res, next) => {
  try {
    const studentsObject = await dbService.getStudents(req.user.googleId);
    res.status(200).json({ students: studentsObject.students });
  } catch (error) {
    next(error);
  }
};

const viewStudentBySudentIdParam = async (req, res, next) => {
  console.log("req.params: ", req.params);
  const { studentId } = req.params;
  try {
    const student = await dbService.getStudentById(studentId);
    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};

const addNewStudent = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("req.user: ", req.user);
    try {
      const teacher = await dbService.getTeacherByGmail(req.user.email);
      const { firstName, lastName, email, eventDate, followUpEmails } =
        req.body;
      console.log("followUpEmails: ", followUpEmails);
      await dbService.addStudent(
        teacher,
        firstName,
        lastName,
        email,
        eventDate,
        followUpEmails
      );
      res.status(201).json({ message: "Student added" });
    } catch (error) {
      next(error);
    }
  } else {
    next(new CustomError("Not authenticated", 401));
  }
};

const createQuestionnaire = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Questionnaire created" });
  } catch (error) {
    next(error);
  }
};

const scheduleMeeting = async (req, res, next) => {
  try {
    res.status(201).json({ message: "Meeting scheduled" });
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

const updateStudent = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Student updated" });
  } catch (error) {
    next(error);
  }
};

export {
  viewStudents,
  viewStudentBySudentIdParam,
  addNewStudent,
  createQuestionnaire,
  scheduleMeeting,
  updateStudent,
  sendEmail,
};
