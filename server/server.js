import express from "express";
import { db } from './src/data/db.js'
import linksRouter from "./src/routes/links.routes.js";

const app = express();
const PORT = 3000;

app.use("/api", linksRouter);

app.listen(PORT, () => {
    console.log(`Server is now listening on http://localhost:${PORT}`);
});