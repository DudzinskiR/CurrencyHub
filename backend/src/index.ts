import express, { Application } from "express";
import { Server } from "http";
import { Request, Response } from 'express';
import router from "./routes";
import createHttpError from "http-errors";
import { config } from 'dotenv'
import cors from "cors";

config();

const app: Application = express();

app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('API running 🥳')
})

const PORT: Number = Number(process.env.PORT) || 8080
const server: Server = app.listen(PORT, () => {
    console.log(`Express started on port ${PORT} :)`);
});