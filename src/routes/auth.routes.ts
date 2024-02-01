import { Router } from "express";
import {
    signupUser,
    loginUser
  } from "../controller/auth.controller";
  import { validateUserCredentials } from "../middleware/validateUser";
 

const router = Router();

router.post("/signup", validateUserCredentials, signupUser);

router.post("/login", loginUser);

export default router;