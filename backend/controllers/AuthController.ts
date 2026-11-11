import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import redisClient from "../config/redis.js";
import { generateOTP, hashOTP, compareOTP } from "../utils/generateOTP.js";
import { sendOTPEmail } from "../services/email.js";

const OTP_EXPIRY = 300; // 5 minutes
const RESEND_COOLDOWN = 60; // 60 seconds
const MAX_ATTEMPTS = 5;

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
    //Validation check
    const normalizedEmail = email.trim().toLowerCase();

    if (
      typeof name !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      password.length < 8 ||
      name.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide valid registration information",
      });
      return;
    }

    const existUser = await userModel.findOne({ normalizedEmail });
    if (existUser) {
      res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
      return;
    }

    // Redis keys
    const pendingKey = `signup:pending:${normalizedEmail}`;
    const cooldownKey = `signup:cooldown:${normalizedEmail}`;

    // Prevent repeated OTP requests
    const cooldown = await redisClient.exists(cooldownKey);

    if (cooldown) {
      res.status(429).json({
        success: false,
        message: "Please wait before requesting another OTP.",
      });
      return;
    }

    // Generate OTP
    const otp = generateOTP();

    //Hashing password and OTP

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedOTP = hashOTP(otp);

    // Temporary signup data
    const pendingUser = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      hashedOTP,
      attempts: 0,
    };

    // Store in Redis for 5 minutes
    await redisClient.set(pendingKey, JSON.stringify(pendingUser), {
      EX: OTP_EXPIRY,
    });

    // Set resend cooldown
    await redisClient.set(cooldownKey, "1", {
      EX: RESEND_COOLDOWN,
    });

    // Send OTP
    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      await redisClient.del(pendingKey);
      await redisClient.del(cooldownKey);
      throw emailError;
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify your email.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to process registration.",
    });
  }

  //   const user = new userModel({
  //     email,
  //     password: hashedPassword,
  //     name
  //   });

  //   await user.save();
  //   res.status(201).json({
  //     success: true,
  //     message: "User registration successful",
  //     user: {
  //       id: user._id,
  //       email: user.email,
  //       name: user.name,
  //     },
  //   });
  // } catch (error) {
  //   console.error(
  //     "Registration error:",
  //     error instanceof Error ? error.message : error,
  //   );

  //   res.status(500).json({
  //     success: false,
  //     message: "User registration failed",
  //   });
  // }
};

// ========================================
// 2. VERIFY OTP - CREATE MONGODB USER
// ========================================

const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (
      typeof email !== "string" ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      res.status(400).json({
        success: false,
        message: "Valid email and 6-digit OTP are required.",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const pendingKey = `signup:pending:${normalizedEmail}`;

    // Get pending signup data
    const pendingData = await redisClient.get(pendingKey);

  

    if (!pendingData) {
      res.status(400).json({
        success: false,
        message:
          "OTP expired or registration not found. Please register again.",
      });
      return;
    }

    const pendingUser = JSON.parse(pendingData);

    // Check maximum attempts
    if (pendingUser.attempts >= MAX_ATTEMPTS) {
      await redisClient.del(pendingKey);

      res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Please register again.",
      });
      return;
    }

    // Compare OTP
    const isValidOTP = compareOTP(otp, pendingUser.hashedOTP);

    if (!isValidOTP) {
      pendingUser.attempts += 1;

      const remainingTTL = await redisClient.ttl(pendingKey);

      if (remainingTTL > 0) {
        await redisClient.set(pendingKey, JSON.stringify(pendingUser), {
          EX: remainingTTL,
        });
      }

      res.status(400).json({
        success: false,
        message: "Invalid OTP.",
        attemptsRemaining: MAX_ATTEMPTS - pendingUser.attempts,
      });
      return;
    }

    // Check MongoDB again before creating user
    const existingUser = await userModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      await redisClient.del(pendingKey);

      res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
      return;
    }

    // Create permanent MongoDB user
    const user = await userModel.create({
      name: pendingUser.name,
      email: normalizedEmail,
      password: pendingUser.password,
      isVerified: true,
    });

    // Delete temporary Redis data
    await redisClient.del(pendingKey);
    await redisClient.del(`signup:cooldown:${normalizedEmail}`);

    res.status(201).json({
      success: true,
      message: "Email verified and registration successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    res.status(500).json({
      success: false,
      message: "OTP verification failed.",
    });
  }
};

// ========================================
// 3. RESEND OTP
// ========================================

const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (typeof email !== "string") {
      res.status(400).json({
        success: false,
        message: "Email is required.",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const pendingKey = `signup:pending:${normalizedEmail}`;
    const cooldownKey = `signup:cooldown:${normalizedEmail}`;

    const pendingData = await redisClient.get(pendingKey);

    if (!pendingData) {
      res.status(400).json({
        success: false,
        message: "Registration expired. Please register again.",
      });
      return;
    }

    const cooldown = await redisClient.exists(cooldownKey);

    if (cooldown) {
      const remaining = await redisClient.ttl(cooldownKey);

      res.status(429).json({
        success: false,
        message: `Please wait ${remaining} seconds before requesting another OTP.`,
      });
      return;
    }

    const pendingUser = JSON.parse(pendingData);

    // Generate a new OTP
    const otp = generateOTP();

    pendingUser.otpHash = hashOTP(otp);
    pendingUser.attempts = 0;

    // Preserve remaining registration lifetime
    const remainingTTL = await redisClient.ttl(pendingKey);

    if (remainingTTL <= 0) {
      res.status(400).json({
        success: false,
        message: "Registration expired. Please register again.",
      });
      return;
    }

    await redisClient.set(pendingKey, JSON.stringify(pendingUser), {
      EX: remainingTTL,
    });

    // Set resend cooldown
    await redisClient.set(cooldownKey, "1", {
      EX: RESEND_COOLDOWN,
    });

    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      console.error("Resend email error:", emailError);

      // Invalidate OTP if email delivery fails
      await redisClient.del(pendingKey);
      await redisClient.del(cooldownKey);

      res.status(500).json({
        success: false,
        message: "Unable to send OTP. Please register again.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to resend OTP.",
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

export { register, verifyOTP, resendOTP, login };
