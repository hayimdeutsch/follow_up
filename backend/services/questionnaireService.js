import Questionnaire from "../models/Questionnaire";
import CustomError from "../utils/CustomError";

export async function submitQuestionnaire(token, questions) {
  try {
    const questionnaire = await Questionnaire.findOne({ token });
    if (!questionnaire) {
      throw new CustomError("Questionnaire not found", 404);
    }

    questionnaire.submitted = true;

    await questionnaire.save();
    return questionnaire;
  } catch (error) {
    throw new CustomError("Failed to submit questionnaire", 500, error);
  }
}

export async function getQuestionnaireByToken(token) {
  try {
    const questionnaire = await Questionnaire.findOne({ token });
    if (!questionnaire) {
      throw new CustomError("Questionnaire not found", 404);
    }
    return questionnaire;
  } catch (error) {
    throw new CustomError("Failed to retrieve questionnaire", 500, error);
  }
}

export async function createQuestionnaire(questions) {
  try {
    const token = Math.random().toString(36).substring(7);
    const questionnaire = new Questionnaire({ questions, token });
    await questionnaire.save();
    return questionnaire;
  } catch (error) {
    throw new CustomError("Failed to create questionnaire", 500, error);
  }
}

export async function createFromTemplate(templateId, teacherId) {}
export async function updateQuestionnaire(id, updates) {}
export async function generateStudentLink(questionnaireId) {}
export async function submitQuestionnaireResponse(token, responses) {}
