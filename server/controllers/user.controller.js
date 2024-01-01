import User from "../models/user.model.js";
//Test API
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Cannot fetch data : ", error);
  }
};
