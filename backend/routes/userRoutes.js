import { Router } from "express";
import checkAdmin from "../middleware/checkAdmin.js";
import checkAuthenticated from "../middleware/checkAuthenticated.js";

import {
  approveUser,
  createApprovedUser,
  deleteUser,
  getApprovedUsers,
  getPendingUsers,
} from "../controllers/userController.js";
import mockAuthenticated from "../mocks/mockAuthenticated.js";

const userRouter = Router();

// userRouter.use(checkAuthenticated);
// userRouter.use(checkAdmin);
userRouter.use(mockAuthenticated);

userRouter.get("/pending", getPendingUsers);
userRouter.get("/approved", getApprovedUsers);
userRouter.post("/approved", createApprovedUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/:userId/approve", approveUser);

export default userRouter;
