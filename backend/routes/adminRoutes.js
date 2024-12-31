import { Router } from "express";
import checkAdmin from "../middleware/checkAdmin.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";
import {
  approveUser,
  createUserAndApprove,
  getUsers,
  checkAdminForLogin,
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/check-admin", checkAdminForLogin);

adminRouter.use(checkAuthenticated);

adminRouter.use(checkAdmin);

adminRouter.get("/users", getUsers);

adminRouter.post("/users", createUserAndApprove);

adminRouter.post("/:gmail/approve", approveUser);

export default adminRouter;
