import express from "express";
import linksRouter from "./src/routes/links.routes.js";
import dotenv from "dotenv"
import https from "https";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.CLIENT_HOST || "https://localhost:5173";


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api", linksRouter);

const key = fs.readFileSync("certs/localhost+2-key.pem");
const cert = fs.readFileSync("certs/localhost+2.pem");

https.createServer({ key, cert }, app).listen(PORT, () => {
  console.log(`HTTPS server on https://localhost:${PORT}`);
});
// app.listen(PORT, () => {
//     console.log(`Server is now listening on http://localhost:${PORT}`);
// });