import { Router } from "express";

import {
  addComment,
  getComment,
  getCommentsOnPost,
  updateComment,
  deleteComment,
} from "../controller/comment.controller";
import authenticate from "../middleware/authenticate";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.use(authenticate, requireUser);

router.get("/:id", getComment);

router.get("/:id", getCommentsOnPost);

router.post("/", addComment);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
