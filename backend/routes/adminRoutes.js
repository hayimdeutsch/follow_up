import express from "express";
import {
  approveUser,
  createUserAndApprove,
  getApprovedUsers,
  createTemplateQuestionnaire,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/users", createUserAndApprove);

router.post("/users/:id/approve", approveUser);

router.get("/users", getApprovedUsers);

router.post("/template", createTemplateQuestionnaire);

export default router;
