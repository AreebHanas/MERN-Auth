import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { signinRoute, signupRoute } from "./routes/auth.route.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = 5000;

const db = mongoose
  .connect(process.env.mongodb)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port no : ${port}`);
    });
  })
  .catch((error) => {
    console.log("Can not connect to the data base ", error);
  });

app.use("/api", signupRoute);
app.use("/api", signinRoute);

app.use((err, req, res, next) => {
  const message = err.message || "Server error";
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message,
    status,
  });
});
