import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // 1. Validate required fields
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new userModel({
      email,
      password: hashedPassword,
      name,
      OTP,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User registration successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(
      "Registration error:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // 2. Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // 3. Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // 4. Generate JWT access token
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // 5. Successful response
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error instanceof Error ? error.message : error,
    );

    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

export { register, login };
