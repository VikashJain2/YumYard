import express from "express";

import { changeUserStatus, getUsers, loginAdmin, loginUser, registerUser, removeUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);

userRouter.post("/login",loginUser)
userRouter.get("/get-users",getUsers)
userRouter.post("/remove",removeUser)
userRouter.post("/status",changeUserStatus)
userRouter.post("/login-admin",loginAdmin)

export default userRouter