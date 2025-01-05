import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";

const createQuestionnaire = async (req, res, next) => {
  try {
    const { questions, token, title } = req.body;
    const studentId = req.params.studentId;

    const teacher = await dbService.getTeacherByGoogleId(req.user.googleId);
    const student = await dbService.getStudentById(studentId);

    if (!teacher || !student || !title || !questions || !token) {
      throw new CustomError("Missing required fields", 400);
    }

    let quesObj = {
      questions,
      teacher: teacher._id,
      student: student._id,
      token,
      title,
    };

    const questionnaire = await dbService.createQuestionnaire(quesObj);
    dbService.addQuestionnaireToStudent(studentId, questionnaire);
    res.status(201).json(questionnaire);
  } catch (error) {
    next(error);
  }
};

const getQuestionnaireByToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    console.log("req.params", req.params);

    const questionnaire = await dbService.getQuestionnaireByToken(
      token.toString()
    );
    if (!questionnaire) {
      throw new CustomError("Questionnaire not found", 404);
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    next(error);
  }
};

const submitQuestionnaire = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { questions } = req.body;
    if (!questions) {
      throw new CustomError("Missing required fields", 400);
    }

    const questionnaire = await dbService.submitQuestionnaire(token, questions);
    res.status(200).json(questionnaire);
  } catch (error) {
    next(error);
  }
};

export { createQuestionnaire, getQuestionnaireByToken, submitQuestionnaire };
