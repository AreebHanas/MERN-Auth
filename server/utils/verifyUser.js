import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log(token);
  if (!token) {
    console.log("no token");
    return res.status(403).json("You need to login");
  } else {
    Jwt.verify(token, process.env.jwt_token, (error, user) => {
      if (error) {
        console.log("decrypting err : ", error.message);
        return res.status(403).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  }
};
