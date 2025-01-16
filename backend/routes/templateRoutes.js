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

// All routes have been tested with mock authentication and admin checks

import mockAuthenticated from "../mocks/mockAuthenticated.js";
import mockAdminCheck from "../mocks/mockAdminCheck.js";

const templateRouter = express.Router();

templateRouter.use(checkAuthenticated);
// templateRouter.use(mockAuthenticated);

templateRouter.get("/", getTemplates);
templateRouter.get("/:title", getTemplateQuestions);

templateRouter.use(checkAdmin);
// templateRouter.use(mockAdminCheck);

templateRouter.post("/", createTemplate);
templateRouter.put("/:title", updateTemplate);
templateRouter.delete("/:title", deleteTemplate);

export default templateRouter;
