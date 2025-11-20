import db from '../data/db.js'
import express from "express";

const router = express.Router();

router.get("/", db);

export default router;