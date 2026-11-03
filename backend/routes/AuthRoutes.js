import express from "express";
import register from "../controllers/AuthController.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);

export { AuthRoutes };
