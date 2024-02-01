import { Router, Request, Response } from "express";
import {
    signupUser,
    loginUser
  } from "../controller/auth.controller";
  import { validateUserCredentials } from "../middleware/validateUser";
 

const router = Router();

router.post("/signup", validateUserCredentials, (req: Request, res: Response) => signupUser(req, res));
router.post("/login", (req: Request, res: Response) => loginUser(req, res));

export default router;