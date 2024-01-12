import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const DIR = "./public";

export const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("Enter the valid details");
    } else {
      const hashPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({ username, email, password: hashPassword });
      await newUser.save();
      res.status(201).json({ message: "User added successfully" });
      console.log("User added successfully");
    }
  } catch (error) {
    // console.log("Can not add the user : ", error);
    // res.status(500).json({ message: "Can not add the user" });
    next(error.message);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorhandler(401, "Your Mail or Password is incorrect"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorhandler(401, "Your Mail or Password is incorrect"));
    }

    const token = jwt.sign({ validUser }, process.env.jwt_token);
    const { password: hashPassword, ...prv } = validUser._doc;
    const expire = new Date(Date.now() + 3600 * 1000);
    const pass = { validUser, token };
    res
      .cookie("access_token", token, { httpOnly: true, expires: expire })
      .status(200)
      .json(pass);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) {
      const rendomPassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(rendomPassword, 10);
      const newUser = await new User({
        username: (req.body.name || "").replace(/\s/g, "").toLowerCase(),
        // req.body.name.split(" ").join("").toLowerCase() +
        // Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashPassword,
        profilepicture: req.body.photo,
      });
      const token = jwt.sign({ validUser }, process.env.jwt_token);
      const expire = new Date(Date.now() + 3600 * 1000);
      const { password, ...prv } = newUser._doc;
      const pass = { newUser, prv, token };

      const save = await newUser.save(); // Move this line here to save the new user

      res
        .cookie("access_token", token, { httpOnly: true, expires: expire })
        .status(201) // Change the status code to 201
        .json(save);
    } else {
      const token = jwt.sign({ validUser }, process.env.jwt_token);
      const expire = new Date(Date.now() + 3600 * 1000);
      const { password: hashPassword, ...prv } = validUser._doc;
      const pass = { prv, token };

      res
        .cookie("access_token", token, { httpOnly: true, expires: expire })
        .status(200)
        .json(validUser);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "error from catch" });
  }
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const update = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const userid = req.params.id;
  let body;

  body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    if (body["password"]) {
      const hashPassword = bcryptjs.hashSync(body["password"], 10);
      body["password"] = hashPassword;
    }

    if (req.file) {
      body["profilepicture"] = url + "/public/" + req.file.filename;
    }

    const update = await User.findByIdAndUpdate(userid, body, { new: true });
    res.status(201).json({ update });
    console.log("Updated");
  } catch (error) {
    console.log("updete error : ", error.message);
  }
};

export const remove = async (req, res) => {
  const delId = req.params.id;
  try {
    const del = await User.findByIdAndDelete(delId);
    res.status(200).json({ message: "Accouont Deleted" });
    console.log("Deleted");
  } catch (error) {
    console.log("Cant delete : ", error);
  }
};
