import Teacher from "../models/Teacher.js";
import Question from "../models/Question.js";
import Template from "../models/Template.js";
import CustomError from "../utils/CustomError.js";

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

const approveUser = async (gmail) => {
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

const getTeacherByGmail = async (gmail) => {
  return await getTeacherByField("gmail", gmail);
};

const getTeacherByGoogleId = async (googleId) => {
  return await getTeacherByField("googleId", googleId);
};

const getTeacherByField = async (field, value) => {
  try {
    const teacher = await Teacher.findOne({ field: value });
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
  const templateQuestions = [];
  questions.forEach((question) => {
    const currentQuestion = new Question(question);
    try {
      currentQuestion.validate();
    } catch (error) {
      throw new CustomError("Validation Error", 400, error);
    }
    templateQuestions.push(currentQuestion);
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

export {
  createUser,
  createApprovedUser,
  approveUser,
  isUserApproved,
  getTeacherByGmail,
  getTeacherByGoogleId,
  getAllTeachers,
  createTemplate,
  getTemplateQuestions,
};
