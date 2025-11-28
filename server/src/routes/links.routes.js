import { db } from '../data/db.js'
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Middleware to set Content-Type: application/json for all routes
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.get("/links", (req, res) => {
    res.json({links: db.links});
});

router.get("/username", (req, res) => {
    res.json({username: db.username});
});
router.get("/bio", (req, res) => {
    res.json({bio: db.bio});
});

router.get('/profile-pic', (req, res) => {
    const imagePath = path.join(__dirname, '..', 'data', 'images', 'profile_pic.jpg');
    res.sendFile(imagePath);
});
export default router;
