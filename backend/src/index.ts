import express from "express";

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hi :)');
});

app.listen(3000, () => {
    console.log(`Express started on port 3000`)
});