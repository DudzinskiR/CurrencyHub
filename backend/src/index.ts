import express, { Application } from "express";
import { Server } from "http";

import router from "./routes";
import createHttpError from "http-errors";
import { config } from 'dotenv'
config();

console.log(process.env);

const app: Application = express();

app.use('/api', router);

const PORT: Number = Number(process.env.PORT) || 3000
const server: Server = app.listen(PORT, () => {
    console.log(`Express started on port ${PORT} :)`)
});