import express from "express";
import {register, login} from "../controllers/AuthController.js";


const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);

export { AuthRoutes };
