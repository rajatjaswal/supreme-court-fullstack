import express from "express";
import bodyParser from "body-parser";
import { initializeApp } from "./api/app";
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({
    // limit: '1000kb',
    extended: true,
}));
app.use(bodyParser.json({
    // limit: '1000kb',
    extended: true
}));

app.use(cors());

// Initialize app
initializeApp(app);

export default app;