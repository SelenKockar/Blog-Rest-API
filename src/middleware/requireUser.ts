import { NextFunction, Request, Response } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      throw new Error("Unauthenticated");
    }

    next();
  } catch (err) {
    next(err);
  }
};
