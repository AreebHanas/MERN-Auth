import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
    console.log("User added successfully");
  } catch (error) {
    // console.log("Can not add the user : ", error);
    // res.status(500).json({ message: "Can not add the user" });
    next(error);
  }
};
