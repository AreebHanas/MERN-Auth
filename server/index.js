import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user.route.js";

const app = express();
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

app.use("/user", router);
