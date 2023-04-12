import express from "express";

import { config } from 'dotenv'
config()

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hi :)');
});


const PORT: Number = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}`)
});