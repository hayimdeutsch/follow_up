import { Router } from "express";
import { getTeacherByGmail } from "../services/dbService.js";
import Teacher from "../models/Teacher.js";
const testRouter = Router();

testRouter.get("/", async (req, res) => {
  const teacher = await Teacher.findOne({ email: "chayimdeutsch@gmail.com" });
  const teacher2 = await getTeacherByGmail("chayimdeutsch@gmail.com");
  console.log("teacher", teacher);
  console.log("teacher2", teacher2);
  const responseObj = teacher || { message: "Teacher not found" };
  res.json(responseObj);
});

export default testRouter;
