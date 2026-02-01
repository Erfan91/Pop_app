import { Router } from "express";
import {createPost, getPost, updatePost, deletePost, uploadImage, getUserPosts} from '../controllers/post.controller.js';
const router = Router();

router.route("/get-post").get(getPost);
router.route("/user-posts/:id").get(getUserPosts);
router.route("/create-post").post(createPost);
router.route("/upload-image").post(uploadImage);
router.route("/update-post/:id").patch(updatePost);
router.route("/delete-post/:id").delete(deletePost);


export default router;