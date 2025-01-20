import { Request, Response } from "express";
import { Database } from "../database";

export const register = async (req: Request, res: Response) => {
    const body = req.body;

    const username = body['username'] as string | undefined;
    const password = body['password'] as string | undefined;

    if (!username || !password) {
        res.status(400).json({ code: 400, message: `Missing required filed: 'username' or 'password'` });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({ code: 400, message: `Field 'password' is too short` });
        return;
    }

    const user = await Database.select("SELECT username FROM users WHERE username=?", [username]);

    if (user.length > 0) {
        res.status(400).json({ code: 409, message: `User '${username}' already exists` });
        return;
    }

    const token = await Database.select("INSERT INTO users(username, password) VALUES(?, ?) RETURNING token", [username, password]);

    await Database.execute("INSERT INTO tokens(token) VALUES(?)", [token[0].token]);

    res.status(201).json({ token: token[0].token });
};

export const login = async (req: Request, res: Response) => {
    const body = req.body;

    const username = body['username'] as string | undefined;
    const password = body['password'] as string | undefined;

    if (!username || !password) {
        res.status(400).json({ code: 400, message: `Missing required filed: 'username' or 'password'` });
        return;
    }

    const data = await Database.select("SELECT * FROM users WHERE username=?", [username]);

    if (data.length === 0) {
        res.status(404).json({ code: 404, message: `User '${username}' doesn't exists` });
        return;
    }

    const rawUser = data[0];

    if (rawUser.password !== password) {
        res.status(409).json({ code: 409, message: "Invalid password" });
        return;
    }

    res.status(200).json({ token: rawUser.token });
};