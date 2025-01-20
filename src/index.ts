import express from "express";
import { authRouter } from "./routers/auth.routes";
import { Database } from "./database";
import { userRouter } from "./routers/user.routes";

const app = express();
const port = 5000;

Database.connect();
Database.monitor();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port} !`);
});