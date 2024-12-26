import express from "express";
import {
  viewStudents,
  viewStudentById,
  addStudent,
  createQuestionnaire,
  sendEmail,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/students", viewStudents);

router.post("/students", addStudent);

router.get("/students/:id", viewStudentById);

router.post("/students/:id/meetings", createMeeting);

router.post("/students/:id/questionnaires", createQuestionnaire);

router.post("/emails", sendEmail);

export default router;
