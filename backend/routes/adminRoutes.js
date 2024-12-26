import { Router } from "express";
import checkAdmin from "../middleware/checkAdmin.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import {
  approveUser,
  createUserAndApprove,
  getUsers,
  createTemplateQuestionnaire,
} from "../controllers/adminController.js";

const adminRouter = Router();

// adminRouter.use(checkAuthenticated);
adminRouter.use(checkAdmin);

adminRouter.get("/users", getUsers);

adminRouter.post("/users", createUserAndApprove);

adminRouter.post("/:gmail/approve", approveUser);

adminRouter.post("/template", createTemplateQuestionnaire);

export default adminRouter;
