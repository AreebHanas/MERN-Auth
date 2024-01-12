import Jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(403).json("You need to login");

  Jwt.verify(token, process.env.jwt_token, (error, user) => {
    if (error) return res.status(403).json("Token is not valid");

    req.user = user;
    next();
  });
};
