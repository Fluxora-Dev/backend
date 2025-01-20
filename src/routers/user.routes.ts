import { Router } from "express";
import { getMe } from "../controllers/user.controller";
import { tokenRequired } from "../middlewares/tokenRequired";

export const userRouter = Router();

userRouter.get('/me', tokenRequired, getMe);