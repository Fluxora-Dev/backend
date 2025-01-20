import { Request, Response } from "express";
import { Database } from "../database";
import { User } from "../models/user.model";

export const getMe = async (req: Request, res: Response) => {
    const token = req.headers.authorization!;

    const data = await Database.select("SELECT * FROM users WHERE token = ?", [token]);

    if (data.length === 0) {
        res.status(401).json({ code: 401, message: "Unauthorized" });
        return;
    }

    const user = User.fromJSON(data[0]);

    res.status(200).json(user.toJSON());
}