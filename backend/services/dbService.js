import mongoose, { now } from "mongoose";
import Teacher from "../models/Teacher.js";
import Questionnaire from "../models/Questionnaire.js";
import Template from "../models/Template.js";
import CustomError from "../utils/CustomError.js";
import Student from "../models/Student.js";
import Meeting from "../models/Meeting.js";
import FollowUp from "../models/FollowUp.js";

const createUser = async (firstName, lastName, email, phone) => {
  const newUser = new Teacher({ firstName, lastName, email, phone });
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

const createApprovedUser = async ({ firstName, lastName, email, phone }) => {
  const newUser = new Teacher({
    firstName,
    lastName,
    email,
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
    if (error.code === 11000) {
      throw new CustomError("User already exists", 409);
    } else {
      throw new CustomError("DB Error", 500, error);
    }
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

const approveUserById = async (userId) => {
  try {
    const user = await Teacher.findByIdAndUpdate(userId, { approved: true });
    return user;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await Teacher.findByIdAndDelete(userId);
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

const getUnapprovedTeachers = async () => {
  try {
    const teachers = await Teacher.find({ approved: false });
    return teachers;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getApprovedTeachers = async () => {
  try {
    const teachers = await Teacher.find({ approved: true });
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
    if (error instanceof mongoose.Error.ValidationError) {
      throw new CustomError("Validation Error", 400, error);
    } else if (error.code === 11000) {
      throw new CustomError("Template title already exists", 400);
    } else {
      throw new CustomError("DB Error", 500, error);
    }
  }
};

const getAllTemplates = async () => {
  try {
    const questionnaires = await Template.find();
    return questionnaires;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getTemplateByTitle = async (title) => {
  try {
    const template = await Template.findOne({ title });
    return template;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const updateTemplateByTitle = async (title, updateObject) => {
  try {
    const template = await Template.findOneAndUpdate({ title }, updateObject, {
      new: true,
    });
    return template;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const deleteTemplateByTitle = async (title) => {
  try {
    const template = await Template.findOneAndDelete({ title });
    return template;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createStudent = async ({
  teacher,
  firstName,
  lastName,
  email,
  eventDate,
  scheduledEmails,
}) => {
  const newStudent = new Student({
    teacher,
    firstName,
    lastName,
    email,
    eventDate,
    scheduledEmails,
  });

  try {
    await newStudent.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }

  try {
    await newStudent.save();
    await addStudentToTeacher(teacher, newStudent);
    return newStudent;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId).populate([
      { path: "followUps" },
      {
        path: "teacher",
        select: "firstName lastName email phone _id",
      },
    ]);
    return student;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getStudentsbyGoogleId = async (teacherId) => {
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

const deleteStudentById = async (studentId) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    return deletedStudent;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const updateStudentEmails = async (studentId, followUpEmails) => {
  console.log("followUpEmails: ", followUpEmails);
  try {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $set: { scheduledEmails: followUpEmails } },
      { new: true }
    );
    return student;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const addStudentToTeacher = async (teacherId, student) => {
  const teacher = await Teacher.findById(teacherId);
  teacher.students.push(student._id);
  await teacher.save();
};

///////////////////////////////////////////////////
const getStudentFollowUps = async (studentId) => {
  try {
    const student = await Student.findById(studentId).populate("followUps");
    return student?.followUps;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getFollowUpById = async (followupId) => {
  try {
    const followUp = await FollowUp.findById(followupId).populate([
      {
        path: "questionnaire",
      },
      {
        path: "meeting",
      },
      {
        path: "teacher",
        select: "firstName lastName email phone googleId _id",
      },
      {
        path: "student",
        select: "firstName lastName email _id",
      },
    ]);
    return followUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getFollowUpByToken = async (token) => {
  try {
    const followUp = await FollowUp.findOne({ token }).populate([
      {
        path: "questionnaire",
      },
      {
        path: "meeting",
      },
      {
        path: "teacher",
        select: "firstName lastName email phone googleId _id",
      },
      {
        path: "student",
        select: "firstName lastName email _id",
      },
    ]);
    return followUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createMeeting = async (meeting) => {
  const newMeeting = new Meeting(meeting);
  try {
    await newMeeting.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }
  try {
    await newMeeting.save();
    return newMeeting;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createQuestionnaire = async (questionnaire) => {
  const newQuestionnaire = new Questionnaire(questionnaire);
  try {
    await newQuestionnaire.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }
  try {
    await newQuestionnaire.save();
    return newQuestionnaire;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const createFollowUp = async (
  token,
  title,
  teacherId,
  studentId,
  meetingId,
  questionnaireId
) => {
  const newFollowUp = new FollowUp({
    token,
    title,
    teacher: teacherId,
    student: studentId,
    meeting: meetingId,
    questionnaire: questionnaireId,
  });

  try {
    await newFollowUp.validate();
  } catch (error) {
    throw new CustomError("Validation Error", 400, error);
  }
  try {
    await newFollowUp.save();
    return newFollowUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const addFollowupToStudent = async (studentId, followUpId) => {
  try {
    const student = await Student.findById(studentId);
    student.followUps.push(followUpId);
    await student.save();
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const updateFollowUpById = async (followupId, updatedFollowUp) => {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(
      followupId,
      updatedFollowUp,
      { new: true }
    ).populate([
      {
        path: "questionnaire",
      },
      {
        path: "meeting",
      },
      {
        path: "teacher",
        select: "firstName lastName email phone googleId _id",
      },
      {
        path: "student",
        select: "firstName lastName email _id",
      },
    ]);

    return followUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const deleteFollowUpById = async (followupId) => {
  try {
    const followUp = await FollowUp.findByIdAndDelete(followupId);
    return followUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const deleteFollowUpFromStudent = async (studentId, followUpId) => {
  try {
    const student = await Student.findById(studentId);
    student.followUps = student.followUps.filter(
      (followUp) => followUp._id !== followUpId
    );
    await student.save();
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const confirmMeeting = async (meetingId, selectedTimeSlot, googleEventId) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { $set: { status: "confirmed", selectedTimeSlot, googleEventId } },
      { new: true }
    );
    return meeting;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const submitQuestionnaire = async (questionnaireId, questions) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndUpdate(
      questionnaireId,
      {
        $set: {
          questions,
        },
      }
    );
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const submitFollowUpByToken = async (token) => {
  try {
    const followUp = await FollowUp.findOneAndUpdate(
      { token },
      { submitted: true, submittedAt: now() },
      { new: true }
    ).populate([
      {
        path: "questionnaire",
      },
      {
        path: "meeting",
      },
      {
        path: "teacher",
        select: "firstName lastName email phone googleId _id",
      },
      {
        path: "student",
        select: "firstName lastName email _id",
      },
    ]);
    return followUp;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const updateQuestionnaireById = async (questionnaireId, questions) => {
  try {
    const questionnaire = await Questionnaire.findByIdAndUpdate(
      questionnaireId,
      { questions },
      { new: true }
    );
    return questionnaire;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const updateMeetingById = async (meetingId, timeSlots) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { timeSlots },
      { new: true }
    );
    return meeting;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

/////////////////////////////////////////////////////
export {
  createUser,
  createApprovedUser,
  saveUser,
  approveUserById,
  deleteUserById,
  isUserApproved,
  getTeacherById,
  getTeacherByGmail,
  getTeacherByGoogleId,
  getUnapprovedTeachers,
  getApprovedTeachers,
  createTemplate,
  getAllTemplates,
  getTemplateByTitle,
  updateTemplateByTitle,
  deleteTemplateByTitle,
  createStudent,
  getStudentsbyGoogleId,
  getStudentById,
  deleteStudentById,
  updateStudentEmails,
  getStudentFollowUps,
  getFollowUpById,
  getFollowUpByToken,
  createMeeting,
  createQuestionnaire,
  createFollowUp,
  addFollowupToStudent,
  updateFollowUpById,
  deleteFollowUpById,
  deleteFollowUpFromStudent,
  confirmMeeting,
  submitQuestionnaire,
  submitFollowUpByToken,
  updateQuestionnaireById,
  updateMeetingById,
};

//////////////////////////////////////////////////

const getQuestionnaireById = async (questionnaireId) => {
  try {
    const questionnaire = await Questionnaire.findById(questionnaireId);
    return questionnaire;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const addQuestionnaireToStudent = async (studentId, questionnaire) => {
  try {
    const student = await Student.findById(studentId);
    student.questionnaires.push(questionnaire._id);
    await student.save();
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

const getMeetingById = async (meetingId) => {
  try {
    const meeting = await Meeting.findById(meetingId);
    return meeting;
  } catch (error) {
    throw new CustomError("DB Error", 500, error);
  }
};

export { getQuestionnaireById, addQuestionnaireToStudent, getMeetingById };
