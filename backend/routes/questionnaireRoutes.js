import express from "express";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import {
  createQuestionnaire,
  getQuestionnaireByToken,
  submitQuestionnaire,
} from "../controllers/questionnaireController.js";

const router = express.Router();

router.post("/:studentId/", checkAuthenticated, createQuestionnaire);
router.get("/:token/", getQuestionnaireByToken);
router.put("/:token/", submitQuestionnaire);

export default router;
