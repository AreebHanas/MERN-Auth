import express from "express";
import { addUser, signin } from "../controllers/auth.controller.js";

const route = express.Router();

export const signupRoute = route.post("/adduser", addUser);
export const signinRoute = route.post("/validation", signin);
