import { Request, Response,  CookieOptions } from 'express';
import User from '../models/user.model';
import { hashPassword, comparePasswords, signTokens} from '../services/auth.service';


export const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword
      
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "Registration is successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare the provided password with the stored hash
    const isCorrectPassword = await comparePasswords(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }

    // Sign the tokens
    const { accessToken, refreshToken } = await signTokens(user?.id);

    // Set cookies for tokens
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    };

    res.cookie("accessToken", accessToken, {
      ...cookiesOptions,
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookiesOptions,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    // Send the response
    const loginResponse = {
      message: "Login successful",
      accessToken,
      refreshToken
    };
    res.status(200).json(loginResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};