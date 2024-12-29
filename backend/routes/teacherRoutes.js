import express from "express";
import {
  viewStudents,
  viewStudentById,
  addNewStudent,
  updateStudent,
  createQuestionnaire,
  scheduleMeeting,
  sendEmail,
} from "../controllers/teacherController.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";

const teacherRouter = express.Router();

teacherRouter.use(checkAuthenticated);

teacherRouter.post("/students", addNewStudent);

teacherRouter.get("/students", viewStudents);

teacherRouter.get("/students/:studentId", viewStudentById);

teacherRouter.put("/students/:studentId", updateStudent);

teacherRouter.post("/students/:studentId/questionnaires", createQuestionnaire);

teacherRouter.post("/students/:studentId/meetings", scheduleMeeting);

teacherRouter.post("/emails", sendEmail);

export default teacherRouter;
