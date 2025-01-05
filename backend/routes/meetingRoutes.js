import express from "express";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import {
  createMeeting,
  getMeetingByToken,
  confirmMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/:studentId", checkAuthenticated, createMeeting);

router.get("/:token", getMeetingByToken);

router.put("/:token", confirmMeeting);

export default router;
