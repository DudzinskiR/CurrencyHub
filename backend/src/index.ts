import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Server } from "http";
import createHttpError from "http-errors";

import { config } from 'dotenv'
config()

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi :)');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
})

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
}

  
app.use(errorHandler)

const PORT: Number = Number(process.env.PORT) || 3000

const server: Server = app.listen(PORT, () => {
    console.log(`Express started on port ${PORT} :)`)
});

export function sum(a: number, b: number): number {
    return a + b;
}

module.exports = sum;