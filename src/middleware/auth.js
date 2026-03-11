import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
import User from "../DB/models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.tokenCookie;
    // console.log('********* cookies ***** ', req.cookies.tokenCookie);

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;