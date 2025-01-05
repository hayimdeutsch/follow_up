import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";

const createTemplate = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;
    if (!title || !description || !questions) {
      throw new CustomError("Missing required fields", 400);
    }
    const templateQuestionnaire = await dbService.createTemplate(
      title,
      description,
      questions
    );
    res.status(201).json(templateQuestionnaire);
  } catch (error) {
    next(error);
  }
};

const getTemplates = async (req, res, next) => {
  try {
    const templates = await dbService.getAllTemplates();
    res.status(200).json({ templates });
  } catch (error) {
    next(error);
  }
};

const getTemplateQuestions = async (req, res, next) => {
  try {
    const { id: title } = req.params;
    const template = await dbService.getTemplateByTitle(title);
    res.status(200).json({ questions: template.questions });
  } catch (error) {
    next(error);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const { id: title } = req.params;
    const { questions } = req.body;
    if (!questions) {
      throw new CustomError("Missing required fields", 400);
    }
    await dbService.updateTemplateByTitle(title, questions);
    res.status(200).json({ message: "Template updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    const { id: title } = req.params;
    await dbService.deleteTemplateByTitle(title);
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  createTemplate,
  getTemplates,
  getTemplateQuestions,
  updateTemplate,
  deleteTemplate,
};
