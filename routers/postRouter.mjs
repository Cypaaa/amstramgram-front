import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.mjs";
import postController from "../controllers/postController.mjs";

const postRouter = express.Router();
const upload = multer();

postRouter.get('/posts', postController.posts);
postRouter.get('/posts/new', authMiddleware.required, postController.newpostGet);
postRouter.post('/posts/new', authMiddleware.required, upload.any(), postController.newpostPost);
postRouter.get('/posts/:id', postController.post);

export default postRouter;