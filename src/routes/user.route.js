import express, { Router } from "express";
import {
  GetParticularUser,
  GetUserData,
  LoginUser,
  logOut,
  RegisterUser,
  updateUserData,
} from "../controllers/user.logic.js";
import authMiddleware from "../middleware/auth.js";

const UserRouter = Router();

UserRouter.get("/", authMiddleware, GetUserData);
UserRouter.get("/:id", authMiddleware, GetParticularUser);
UserRouter.post("/register", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.post("/logout", authMiddleware, logOut);
UserRouter.post("/updateuser", authMiddleware, updateUserData);

export default UserRouter;
