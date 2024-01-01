import User from "../models/user.model.js";

export const addUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
    console.log("User added successfully");
  } catch (error) {
    console.log("Can not add the user : ", error);
    res.status(404).json({ message: "Can not add the user" });
  }
};
