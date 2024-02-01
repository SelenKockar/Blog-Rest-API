import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("No token provided.");
  }

  try {
    const decoded = verifyJwt(token, "accessToken");
    console.log(decoded);

    res.locals.user = decoded;

    next();
  } catch (error) {
    return res.status(403).send("Invalid token.");
  }
};

export default authenticate;
