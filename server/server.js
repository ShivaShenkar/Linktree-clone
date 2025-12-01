import express from "express";
import linksRouter from "./src/routes/links.routes.js";
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";

import https from "https";
import fs from "fs";


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
const ALLOWED_ORIGIN = process.env.CLIENT_HOST;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api", linksRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// const key = fs.readFileSync("certs/localhost+2-key.pem");
// const cert = fs.readFileSync("certs/localhost+2.pem");

// https.createServer({ key, cert }, app).listen(PORT, '0.0.0.0',() => {
//   console.log(`HTTPS server on https://localhost:${PORT}`);
// });
app.listen(PORT, () => {
    console.log(`Server is now listening on http://localhost:${PORT}`);
});