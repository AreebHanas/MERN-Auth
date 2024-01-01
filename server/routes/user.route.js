import express from "express";
import { fetch } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/api", fetch);

export default router;
