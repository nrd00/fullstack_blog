import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new userModel({
      email,
      password: hashedPassword,
      name,
      OTP
    });

    await user.save();
    return res.status(200).json({
      success: true,
      message: "User registration successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User registration failed" });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 2. Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Compare entered password with hashed password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT access token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // 5. Send successful response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again."
        });
    }
};


export {register, login};
