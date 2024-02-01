import { Router } from "express";

import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPosts,
} from "../controller/post.controller";
import authenticate from "../middleware/authenticate";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.use(authenticate, requireUser);

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
