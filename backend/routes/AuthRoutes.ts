import express from "express";
import {register, verifyOTP, resendOTP, login} from "../controllers/AuthController.js";


const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/verify-otp", verifyOTP);
AuthRoutes.post("/resend-otp", resendOTP);
AuthRoutes.post("/login", login);

export { AuthRoutes };
