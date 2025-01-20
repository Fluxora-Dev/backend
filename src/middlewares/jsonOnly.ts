import { NextFunction, Request, Response } from "express"

export const jsonOnly = async (req: Request, res: Response, next: NextFunction) => {
    if (req.is("application/json")) {
        next()
    } else {
        res.status(415).json({ code: 415, message: "Only application/json requests are accepted" });
    }
}