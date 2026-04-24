import { Router } from "express";
import {createPost, getPost, updatePost, deletePost, uploadImage, getUserPosts, getUserPics, addLike, getPostById} from '../controllers/post.controller.js';
const router = Router();

router.route("/get-post").get(getPost);
router.route("/user-posts/:id").get(getUserPosts);
router.route("/user-pics/:id").get(getUserPics);
router.route("/post/:id").get(getPostById);
router.route("/create-post").post(createPost);
router.route("/upload-image").post(uploadImage);
router.route("/update-post/:id").patch(updatePost);
router.route("/delete-post/:id").delete(deletePost);
router.route("/like-post").put(addLike)


export default router;