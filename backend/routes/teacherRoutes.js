import express from "express";
import {
  viewStudents,
  viewStudentBySudentIdParam,
  addNewStudent,
  updateStudent,
} from "../controllers/teacherController.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import mockAuthenticated from "../mocks/mockAuthenticated.js";

const teacherRouter = express.Router();

teacherRouter.use(checkAuthenticated);
// teacherRouter.use(mockAuthenticated);

teacherRouter.post("/students", addNewStudent);

teacherRouter.get("/students", viewStudents);

teacherRouter.get("/students/:studentId", viewStudentBySudentIdParam);

teacherRouter.put("/students/:studentId", updateStudent);

export default teacherRouter;
