import express from "express";
import { addUser } from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/api", addUser);

export default route;
