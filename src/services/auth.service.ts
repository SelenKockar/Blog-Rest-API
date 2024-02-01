import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signJwt } from "../utils/jwt";
import User from "../models/User";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
export const signTokens = async (userId: string) => {
  dotenv.config();

  const user = await User.findById(userId).exec();

  if (!user) {
    throw new Error("User not found");
  }

  const jwtVariables = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  const accessToken = signJwt(jwtVariables, "accessToken", {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  const refreshToken = signJwt(jwtVariables, "refreshToken", {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}d`,
  });

  return { accessToken, refreshToken };
};
