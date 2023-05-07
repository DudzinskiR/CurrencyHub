import express, { Application } from "express";
import { Server } from "http";

import { config } from 'dotenv'
import router from "./routes";
import createHttpError from "http-errors";
config();

const app: Application = express();

app.use('/api', router);

const PORT: Number = Number(process.env.PORT) || 3000
const server: Server = app.listen(PORT, () => {
    console.log(`Express started on port ${PORT} :)`)
});