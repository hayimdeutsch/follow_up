import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";
import validateHasFields from "../utils/validateHasFields.js";

const createTemplate = async (req, res, next) => {
  try {
    validateHasFields(req.body, ["title", "description", "questions"]);

    const templateQuestionnaire = await dbService.createTemplate(req.body);
    res.status(201).json(templateQuestionnaire);
  } catch (error) {
    next(error);
  }
};

const getTemplates = async (req, res, next) => {
  try {
    const templates = await dbService.getAllTemplates();
    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

const getTemplateQuestions = async (req, res, next) => {
  try {
    const { title } = req.params;
    const template = await dbService.getTemplateByTitle(title);
    if (!template) {
      throw new CustomError("Template not found", 404);
    }
    res.status(200).json(template.questions);
  } catch (error) {
    next(error);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const { title } = req.params;
    validateHasFields(req.body, ["questions", "description"]);
    const { questions, description } = req.body;

    const updatedTemplate = await dbService.updateTemplateByTitle(
      title,
      req.body
    );

    res.status(200).json(updatedTemplate);
  } catch (error) {
    next(error);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    const { title } = req.params;
    const deletedTemplate = await dbService.deleteTemplateByTitle(title);
    if (!deletedTemplate) {
      throw new CustomError("Template not found", 404);
    }
    res.status(204).end();
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
