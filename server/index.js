import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "./routes/user.route.js";
import auth from "./routes/auth.route.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
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

app.use("/user", fetch);
app.use("/adduser", auth);

app.use((err, req, res, next) => {
  const message = err.message || "Server error";
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message,
    status,
  });
});
