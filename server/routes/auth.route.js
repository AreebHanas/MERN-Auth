import express from "express";
import {
  addUser,
  googleAuth,
  remove,
  signin,
  update,
  upload,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const route = express.Router();

export const signupRoute = route.post("/adduser", addUser);
export const signinRoute = route.post("/validation", signin);
export const googleauthRoute = route.post("/googleauth", googleAuth);
export const updateRoute = route.patch(
  "/update/:id",
  // verifyUser,
  upload.single("profilepicture"),
  update
);
export const DeleteRoute = route.delete("/delete/:id", remove);
