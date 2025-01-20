import { Router } from "express";
import { jsonOnly } from "../middlewares/jsonOnly";
import { login, register } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", jsonOnly, register);
authRouter.post("/login", jsonOnly, login)