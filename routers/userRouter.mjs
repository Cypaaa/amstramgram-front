import express from "express";
import userController from "../controllers/userController.mjs";

const userRouter = express.Router();

userRouter.get('/', userController.home);
userRouter.get('/users/:uuid', userController.profile);
userRouter.get('/login', userController.loginGet);
userRouter.post('/login', userController.loginPost);

export default userRouter;