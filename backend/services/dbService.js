import Teacher from "../models/Teacher.js";
import Question from "../models/Question.js";
import Template from "../models/Template.js";
import CustomError from "../utils/CustomError.js";
import Student from "../models/Student.js";

const createUser = async (firstName, lastName, gmail, phone) => {
  const newUser = new Teacher({ firstName, lastName, email: gmail, phone });
  try {
    await newUser.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }
  try {
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createApprovedUser = async (firstName, lastName, gmail, phone) => {
  const newUser = new Teacher({
    firstName,
    lastName,
    email: gmail,
    phone,
    approved: true,
  });

  try {
    await newUser.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }

  try {
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const saveUser = async (user) => {
  try {
    await user.save();
    return user;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const approveUser = async (gmail) => {
  // console.log(gmail);
  try {
    const user = await Teacher.findOneAndUpdate(
      { email: gmail },
      { approved: true }
    );
    return user;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const isUserApproved = async (gmail) => {
  try {
    const user = await Teacher.findOne({ email: gmail });
    return user ? user.approved : false;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getTeacherById = async (id) => {
  try {
    const teacher = await Teacher.findById(id);
    return teacher;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getTeacherByGmail = async (gmail) => {
  try {
    const teacher = await Teacher.findOne({ email: gmail });
    // console.log("teacher", teacher);
    return teacher;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getTeacherByGoogleId = async (googleId) => {
  try {
    const teacher = await Teacher.findOne({ googleId: googleId });
    // console.log("teacher", teacher);
    return teacher;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getAllTeachers = async () => {
  try {
    const teachers = await Teacher.find();
    return teachers;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createTemplate = async (title, description, questions) => {
  const templateQuestions = questions.map((question) => {
    console.log("question", question);
    return {
      question: question.question,
      hasRange: question.hasRange,
      hasSentence: question.hasSentence,
      range: question.range,
      sentenceAnswer: question.sentenceAnswer,
    };
  });

  const newQuestionnaire = new Template({
    questions: templateQuestions,
    title,
    description,
  });

  try {
    await newQuestionnaire.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }
  try {
    await newQuestionnaire.save();
    return newQuestionnaire;
  } catch (error) {
    throw new Error("Error creating questionnaire: " + error.message);
  }
};

const getTemplateQuestions = async (title) => {
  try {
    const template = await Template.findOne({ title });
    return template.questions;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const addStudent = async (
  teacherId,
  firstName,
  lastName,
  email,
  eventdate,
  followupEmails
) => {
  console.log("followUpEmails: ", followupEmails);
  const newStudent = new Student({
    teacher: teacherId,
    firstName,
    lastName,
    email,
    eventdate,
    followupEmails,
  });

  try {
    await newStudent.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }

  try {
    await newStudent.save();
    await addStudentToTeacher(teacherId, newStudent);
    return newStudent;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getStudents = async (teacherId) => {
  try {
    const teacher = await Teacher.findOne(
      { googleId: teacherId },
      { students: 1, _id: 0 }
    )
      .populate("students")
      .exec();
    return teacher;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const addStudentToTeacher = async (teacherId, student) => {
  const teacher = await Teacher.findById(teacherId);
  teacher.students.push(student._id);
  await teacher.save();
};

export {
  createUser,
  createApprovedUser,
  saveUser,
  approveUser,
  isUserApproved,
  getTeacherById,
  getTeacherByGmail,
  getTeacherByGoogleId,
  getAllTeachers,
  createTemplate,
  getTemplateQuestions,
  addStudent,
  getStudents,
  getStudentById,
};
