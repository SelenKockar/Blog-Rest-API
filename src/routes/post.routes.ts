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

router.post("/create", createPost);

router.get("/posts", getPosts);

router.get("/get/:id", getPost);

router.delete("/delete/:id", deletePost);

router.put("/update/:id", updatePost);

export default router;
