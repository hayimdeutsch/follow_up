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
    res.status(201).json({ message: "Template created successfully" });
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
    const { questions, description } = req.body;
    if (!questions || !description) {
      throw new CustomError("Missing required fields", 400);
    }

    const updatedTemplate = await dbService.updateTemplateByTitle(title, {
      questions,
      description,
    });

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
    res.status(204).json({ message: "Template deleted successfully" });
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
