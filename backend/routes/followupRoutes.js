import { Router } from "express";

import checkAuthenticated from "../middleware/checkAuthenticated.js";
import {
  createFollowup,
  getFollowupByToken,
  submitFollowup,
} from "../controllers/followupController.js";

const router = Router();

router.post("/:studentId/", checkAuthenticated, createFollowup);
router.get("/:token/", getFollowupByToken);
router.put("/:token/", submitFollowup);

export default router;
