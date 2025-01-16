import express from "express";
import {
  getStudentFollowUps,
  createFollowUp,
  getFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUpTeacherController.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import mockAuthenticated from "../mocks/mockAuthenticated.js";
// All routes have been tested with mockAuthenticated (emails sent from system and not personal email)

const followUpTeacherRouter = express.Router({ mergeParams: true });
followUpTeacherRouter.use(checkAuthenticated);
// followUpTeacherRouter.use(mockAuthenticated);

followUpTeacherRouter.get("/", getStudentFollowUps);
followUpTeacherRouter.post("/", createFollowUp);
followUpTeacherRouter.get("/:followupId", getFollowUp);
followUpTeacherRouter.put("/:followupId", updateFollowUp);
followUpTeacherRouter.delete("/:followupId", deleteFollowUp);

export default followUpTeacherRouter;
