import express from "express";
import {
  fetchSessions,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/User.js";
import authenticate from "../middleware/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/sessions", authenticate, fetchSessions);

export default userRouter;
