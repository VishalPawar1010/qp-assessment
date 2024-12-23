import express = require("express");

import { register, login } from "../../controllers/auth.controller";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

export { userRouter };
