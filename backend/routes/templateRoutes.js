import express from "express";
import {
  createTemplate,
  getTemplates,
  getTemplateQuestions,
  updateTemplate,
  deleteTemplate,
} from "../controllers/templateController.js";
import checkAdmin from "../middleware/checkAdmin.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";

const templateRouter = express.Router();

templateRouter.use(checkAuthenticated);

templateRouter.get("/", getTemplates);
templateRouter.get("/:id", getTemplateQuestions);

templateRouter.use(checkAdmin);

templateRouter.post("/", createTemplate);
templateRouter.put("/:id", updateTemplate);
templateRouter.delete("/:id", deleteTemplate);

export default templateRouter;
