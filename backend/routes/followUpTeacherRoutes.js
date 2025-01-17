import express from "express";
import {
  getStudentFollowUps,
  createFollowUp,
  getFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUpTeacherController.js";
// All routes have been tested with mockAuthenticated (emails sent from system and not personal email)

const followUpTeacherRouter = express.Router({ mergeParams: true });

followUpTeacherRouter.get("/", getStudentFollowUps);
followUpTeacherRouter.post("/", createFollowUp);
followUpTeacherRouter.get("/:followupId", getFollowUp);
followUpTeacherRouter.put("/:followupId", updateFollowUp);
followUpTeacherRouter.delete("/:followupId", deleteFollowUp);

export default followUpTeacherRouter;
