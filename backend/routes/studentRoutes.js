import express from "express";
import {
  createStudent,
  getStudent,
  getStudentsByTeacher,
  updateStudentEmails,
  deleteStudent,
} from "../controllers/studentsController.js";
import followUpTeacherRouter from "./followUpTeacherRoutes.js";
import followUpStudentRouter from "./followUpStudentRoutes.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import mockAuthenticated from "../mocks/mockAuthenticated.js";

const studentsRouter = express.Router();

studentsRouter.use("/followups", followUpStudentRouter);
//All routes tested with mockAuthenticated
studentsRouter.use(checkAuthenticated);
// studentsRouter.use(mockAuthenticated);

studentsRouter.post("/", createStudent);
studentsRouter.get("/", getStudentsByTeacher);

studentsRouter.get("/:studentId", getStudent);
studentsRouter.delete("/:studentId", deleteStudent);
studentsRouter.put("/:studentId/emails", updateStudentEmails);

studentsRouter.use("/:studentId/followups", followUpTeacherRouter);

export default studentsRouter;
