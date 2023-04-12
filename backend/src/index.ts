import express, { Application, Request, Response, NextFunction } from "express";

import { config } from 'dotenv'
import { Server } from "http";
config()

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi :)');
});


const PORT: Number = Number(process.env.PORT) || 3000

const server: Server = app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}`)
});