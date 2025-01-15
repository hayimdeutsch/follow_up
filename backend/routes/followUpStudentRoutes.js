import { Router } from "express";
import {
  getFollowUp,
  submitFollowUp,
} from "../controllers/followUpStudentController.js";

const followUpStudentRouter = Router();

followUpStudentRouter.get("/:token", getFollowUp);
followUpStudentRouter.post("/:token/submit", submitFollowUp);

export default followUpStudentRouter;
