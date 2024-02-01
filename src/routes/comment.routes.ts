import { Router, Request, Response } from "express";

import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controller/comment.controller";
import authenticate from "../middleware/authenticate";
import {requireUser}  from "../middleware/requireUser";

const router = Router();

router.use(authenticate, requireUser);

router.post("/add", (req: Request, res: Response) => addComment(req, res)); //auth fonksiyonuna ihtiyaç var mı bilemem

router.get(
  "/get-comment/:postId",

  (req: Request, res: Response) => getComments(req, res)
);

router.delete("/delete/:id", (req: Request, res: Response) =>
  deleteComment(req, res)
);

router.put("/update/:id", (req: Request, res: Response) =>
  updateComment(req, res)
);

export default router;
