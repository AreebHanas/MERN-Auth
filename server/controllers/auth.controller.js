import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorhandler("Your Mail or Password is incorrect", 401));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorhandler("Your Mail or Password is incorrect", 401));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.jwt_token);
    const { password: hashPassword, ...prv } = validUser._doc;
    const expire = new Date(Date.now() + 3600);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expire })
      .status(200)
      .json(prv);
  } catch (error) {
    next(error);
  }
};
