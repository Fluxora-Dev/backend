import { NextFunction, Request, Response } from "express";
import { Database } from "../database";

export const tokenRequired = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({ code: 401, message: "No token provided" });
        return;
    }

    const token = req.headers.authorization;

    const data = await Database.select("SELECT token FROM tokens WHERE token=?", [token]);

    if (data.length === 0) {
        res.status(401).json({ code: 401, message: "Unauthorized" });
        return;
    }

    next();
}