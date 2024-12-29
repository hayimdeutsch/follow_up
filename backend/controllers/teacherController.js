import {
  addStudent,
  getTeacherByGmail,
  getStudents,
  getStudentById,
} from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";

const viewStudents = async (req, res, next) => {
  try {
    const studentsObject = await getStudents(req.user.googleId);
    res.status(200).json({ students: studentsObject.students });
  } catch (error) {
    next(error);
  }
};

const viewStudentById = async (req, res, next) => {
  console.log("req.params: ", req.params);
  const { studentId } = req.params;
  try {
    const student = await getStudentById(studentId);
    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};

const addNewStudent = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("req.user: ", req.user);
    try {
      const teacher = await getTeacherByGmail(req.user.email);
      const { firstName, lastName, email, eventDate, followUpEmails } =
        req.body;
      console.log("followUpEmails: ", followUpEmails);
      await addStudent(
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
  viewStudentById,
  addNewStudent,
  createQuestionnaire,
  scheduleMeeting,
  updateStudent,
  sendEmail,
};
